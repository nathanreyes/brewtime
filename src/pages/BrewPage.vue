<script setup lang="ts">
import { computed } from 'vue';
import DataDisplay from '@/components/DataDisplay.vue';
import IconButton from '@/components/IconButton.vue';
import IconMenu from '@/components/icons/IconMenu.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';
import IconRefreshCw from '@/components/icons/IconRefreshCw.vue';
import RecipeStepListItem from '@/components/RecipeStepListItem.vue';
import AppHeader from '@/components/AppHeader.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useAppState } from '@/use/appState';

const { brewer } = useAppState();
const { recipe, hasStarted, hasCompleted, running, duration, toggleRunning, durationLabel, reset } = brewer;

const showReset = computed(() => !running.value && (duration.value > 0 || hasCompleted.value));
const showPlayPause = computed(() => !hasCompleted.value);

function edit() {
  console.log('edit');
}
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
        <!--Edit button-->
        <IconButton @click="edit">
          <IconEdit />
        </IconButton>
      </template>
    </AppHeader>
    <!--App content-->
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <!--Recipe content-->
        <div class="flex-grow flex-shrink overflow-y-auto border-b">
          <template v-if="!(running || hasStarted)">
            <!--Recipe metadata-->
            <div class="border-b text-sm divide-y">
              <!--Recipe notes-->
              <p v-if="recipe.notes" class="text-sm text-gray-600 dark:text-gray-300 p-4">
                {{ recipe.notes }}
              </p>
              <!--Recipe parameters-->
              <div class="flex divide-x">
                <DataDisplay class="flex-grow" label="Water Amt" :data="recipe.waterAmount" />
                <DataDisplay class="flex-grow" label="Coffee Amt" :data="recipe.coffeeAmount" />
                <DataDisplay class="flex-grow" label="Ratio" :data="recipe.ratio" />
              </div>
              <div class="flex divide-x">
                <DataDisplay class="flex-grow" label="Water Temp" :data="recipe.waterTemp" />
                <DataDisplay class="flex-grow" label="Grind" :data="recipe.grind" />
                <DataDisplay class="flex-grow" label="Roast" :data="recipe.roast" />
              </div>
            </div>
          </template>
          <div class="mt-2">
            <!--Recipe steps-->
            <RecipeStepListItem
              v-for="(step, i) in recipe.steps"
              :key="i"
              :position="i + 1"
              :step="step"
              :running="running"
              :current="duration"
            />
          </div>
        </div>
        <!--Recipe buttons-->
        <div class="flex-shrink-0 border-t divide-y border-gray-700 sm:mb-8 sm:mt-4 sm:border">
          <!--Reset button-->
          <BaseButton v-if="showReset" @click="reset"> <IconRefreshCw /><span>Reset</span> </BaseButton>
          <!--Play/pause button-->
          <BaseButton v-if="showPlayPause" :active="running" @click="toggleRunning">
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
