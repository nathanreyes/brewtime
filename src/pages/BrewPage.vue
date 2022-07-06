<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAppState } from '@/use/appState';
import DataDisplay from '@/components/DataDisplay.vue';
import { formatDuration } from '@/util/duration';
import type { RecipeField } from '@/use/recipe';
import IconExternalLink from '../components/icons/IconExternalLink.vue';

const { brewer, displayMode } = useAppState();
const { recipe, brew, hasStarted, hasCompleted, running, duration, toggleRunning, durationLabel, reset } = brewer;
const showReset = computed(() => !running.value && (duration.value > 0 || hasCompleted.value));
const showPlayPause = computed(() => !hasCompleted.value);

const contentEl = ref<HTMLElement | null>(null);
function resetBrew() {
  reset();
  if (contentEl.value) {
    contentEl.value.scrollTop = 0;
  }
}

function updateCurrent(current: number) {
  duration.value = current;
}

const editField = ref<RecipeField | null>(null);
const dataFields = computed(() => ({
  waterAmount: {
    id: 'waterAmount',
    label: 'Water Amt',
    data: recipe.value.waterAmount,
    dataLabel: recipe.value.waterAmountLabel,
  },
  waterTemp: {
    id: 'waterTemp',
    label: 'Water Temp',
    data: recipe.value.waterTemp,
    dataLabel: recipe.value.waterTempLabel,
  },
  coffeeAmount: {
    id: 'coffeeAmount',
    label: 'Coffee Amt',
    data: recipe.value.coffeeAmount,
    dataLabel: recipe.value.coffeeAmountLabel,
  },
  coffeeGrind: {
    id: 'coffeeGrind',
    label: 'Grind',
    data: recipe.value.coffeeGrind,
    dataLabel: recipe.value.coffeeGrindLabel,
  },
  ratio: {
    id: 'ratio',
    label: 'Ratio',
    data: recipe.value.ratio,
    dataLabel: recipe.value.ratioLabel,
  },
  roast: {
    id: 'roast',
    label: 'Roast',
    data: recipe.value.roast,
    dataLabel: recipe.value.roastLabel,
  },
}));
</script>

<template>
  <div class="h-screen flex flex-col">
    <AppHeader :title="recipe.name">
      <template #left>
        <!--Menu button-->
        <IconButton @click="$emit('menu-click')">
          <IconMenu />
        </IconButton>
      </template>
      <template #right>
        <!--Light/dark mode button-->
        <IconButton @click="displayMode = displayMode === 'light' ? 'dark' : 'light'">
          <IconSun v-if="displayMode === 'dark'" />
          <IconMoon v-else />
        </IconButton>
      </template>
    </AppHeader>
    <!--App content-->
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <!--Recipe content-->
        <div class="flex-grow flex-shrink overflow-y-auto px-4 sm:-mx-4" ref="contentEl">
          <template v-if="!(running || hasStarted)">
            <!--Recipe image/notes/brew time-->
            <div class="flex items-stretch mb-4 mt-2 space-x-4">
              <img v-if="brew" :src="brew.imgUrl" class="flex-shrink-0 flex-grow-0 h-20" :img-url="brew.imgUrl" />
              <div class="relative flex-grow min-h-full">
                <p v-if="recipe.notes" class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {{ recipe.notes }}
                </p>
                <p v-else class="text-xs text-gray-400 dark:text-gray-600">No notes provided</p>
                <div
                  class="absolute bottom-0 w-full flex justify-end items-center -mb-3 space-x-6 text-gray-400 dark:text-gray-400"
                >
                  <!--Brew time-->
                  <p class="text-xs py-1">Brew Time: {{ formatDuration(recipe.duration) }}</p>
                  <!--External link-->
                  <a
                    v-if="recipe.urlHostname"
                    :href="recipe.url"
                    target="_blank"
                    class="flex items-center text-xs space-x-1 py-1"
                  >
                    <IconExternalLink class="w-4 h-4" />
                    <span class="hover:underline">{{ recipe.urlHostname }}</span>
                  </a>
                </div>
              </div>
            </div>
            <!--Recipe metadata-->
            <div class="border-y text-sm">
              <div class="sm:hidden divide-y">
                <div class="flex divide-x">
                  <DataDisplay class="w-1/2" v-bind="dataFields.waterAmount" v-model="editField" />
                  <DataDisplay class="w-1/2" v-bind="dataFields.waterTemp" v-model="editField" />
                </div>
                <div class="flex divide-x">
                  <DataDisplay class="w-1/2" v-bind="dataFields.coffeeAmount" v-model="editField" />
                  <DataDisplay class="w-1/2" v-bind="dataFields.coffeeGrind" v-model="editField" />
                </div>
                <div class="flex divide-x">
                  <DataDisplay class="w-1/2" v-bind="dataFields.ratio" v-model="editField" />
                  <DataDisplay class="w-1/2" v-bind="dataFields.roast" v-model="editField" />
                </div>
              </div>
              <div class="hidden sm:block divide-y">
                <div class="flex divide-x">
                  <DataDisplay class="w-1/3" v-bind="dataFields.waterAmount" v-model="editField" />
                  <DataDisplay class="w-1/3" v-bind="dataFields.coffeeAmount" v-model="editField" />
                  <DataDisplay class="w-1/3" v-bind="dataFields.ratio" v-model="editField" />
                </div>
                <div class="flex divide-x">
                  <DataDisplay class="w-1/3" v-bind="dataFields.waterTemp" v-model="editField" />
                  <DataDisplay class="w-1/3" v-bind="dataFields.coffeeGrind" v-model="editField" />
                  <DataDisplay class="w-1/3" v-bind="dataFields.roast" v-model="editField" />
                </div>
              </div>
            </div>
            <DataEdit
              v-if="editField"
              :recipe="recipe"
              :brew="brew"
              :edit-field="editField"
              @close="editField = null"
            />
          </template>
          <div>
            <!--Recipe steps-->
            <RecipeStepListItem
              v-for="(step, i) in recipe.steps"
              :key="i"
              :step="step"
              :current="duration"
              :running="running"
              @update:current="updateCurrent"
            />
          </div>
        </div>
        <!--Recipe buttons-->
        <div
          class="flex-shrink-0 mt-4 mb-4 sm:mb-6 mx-4 sm:mx-0 border border-black dark:border-white divide-y divide-black dark:divide-white"
        >
          <!--Reset button-->
          <BaseButton v-if="showReset" is-lg @click="resetBrew"> <IconRefreshCw /><span>Reset</span> </BaseButton>
          <!--Play/pause button-->
          <BaseButton v-if="showPlayPause" is-lg :active="running" @click="toggleRunning">
            <template v-if="running"> <IconPause /> </template>
            <template v-else>
              <IconPlay />
            </template>
            <p class="text-lg" :class="[running ? 'text-white' : 'text-gray-900 dark:text-gray-200']">
              {{ durationLabel }}
            </p>
          </BaseButton>
        </div>
      </div>
    </main>
  </div>
</template>
