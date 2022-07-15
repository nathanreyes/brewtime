<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useAppState } from '@/use/appState';
import { formatDuration } from '@/util/duration';
import { useScrollPosition } from '@/use/scrollPosition';
import type { RecipeField } from '@/use/recipe';

const { brewer } = useAppState();
const { recipe, brew, inProcess, hasCompleted, running, duration, toggleRunning, reset } = brewer;

const contentEl = ref<HTMLElement | null>(null);
const { isTop, isBottom, scrollVisible } = useScrollPosition(contentEl);

function resetBrew() {
  reset();
  if (contentEl.value) {
    contentEl.value.scrollTop = 0;
  }
}

function updateDuration(current: number) {
  duration.value = current;
}

const currentPosition = computed(() => {
  return recipe.value.steps.findIndex((s) => duration.value >= s.start && duration.value <= s.end);
});

function stepPrev(fromPosition: number = currentPosition.value) {
  const steps = recipe.value.steps;
  if (fromPosition <= 0 || fromPosition >= steps.length) return;
  const step = steps[fromPosition - 1];
  duration.value = step.start + 1;
}

function stepNext(fromPosition: number = currentPosition.value) {
  const steps = recipe.value.steps;
  if (fromPosition >= steps.length - 1) return;
  const step = recipe.value.steps[fromPosition + 1];
  duration.value = step.start + 1;
}

function stepReset(fromPosition: number = currentPosition.value) {
  const step = recipe.value.steps[fromPosition];
  duration.value = step.start + 1;
}

const brewLinksHidden = ref(true);
const showBrewLinks = computed(() => !brewLinksHidden.value && brew.value && brew.value.links.length);
function toggleBrewLinksHidden() {
  brewLinksHidden.value = !brewLinksHidden.value;
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
  grind: {
    id: 'grind',
    label: 'Grind',
    data: recipe.value.grind,
    dataLabel: recipe.value.grindLabel,
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
    <AppHeader :class="{ 'border-b transition duration-300': !isTop }" :title="recipe.name" />
    <!--App content-->
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full">
        <!--Recipe content-->
        <div class="flex-grow flex-shrink overflow-y-auto" ref="contentEl">
          <div :class="{ 'sm:ml-4': scrollVisible }">
            <div class="w-full sm:max-w-xl mx-auto">
              <div v-if="!inProcess">
                <!--Recipe image/notes/brew time-->
                <div class="flex items-stretch mt-2 space-x-4 px-4 sm:px-0">
                  <img v-if="brew" :src="brew.imgUrl" class="flex-shrink-0 flex-grow-0 h-20" :img-url="brew.imgUrl" />
                  <div class="relative flex-grow min-h-full">
                    <p v-if="recipe.notes" class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {{ recipe.notes }}
                    </p>
                    <p v-else class="text-xs text-gray-400 dark:text-gray-600">No notes provided</p>
                  </div>
                </div>
                <!--Brew buy/external link-->
                <div
                  class="flex justify-center items-center my-2 px-4 sm:px-0 space-x-6 text-gray-600 dark:text-gray-400"
                >
                  <!--Buy button-->
                  <button class="flex text-xs space-x-2 hover:underline" @click="toggleBrewLinksHidden">
                    <IconShoppingBag class="w-4 h-4" />
                    <span>Buy & Support</span>
                  </button>
                  <!--External link-->
                  <a
                    v-if="recipe.urlHostname"
                    :href="recipe.url"
                    target="_blank"
                    class="flex items-center text-xs space-x-1"
                  >
                    <IconExternalLink class="w-4 h-4" />
                    <span class="hover:underline">{{ recipe.urlHostname }}</span>
                  </a>
                </div>
                <!--Brew links-->
                <div
                  v-if="brew && brew.links.length && showBrewLinks"
                  class="flex items-start flex-wrap border-t space-x-4 py-4"
                >
                  <BrewLink v-for="link in brew.links" :key="link.url" v-bind="link" />
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
                      <DataDisplay class="w-1/2" v-bind="dataFields.grind" v-model="editField" />
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
                      <DataDisplay class="w-1/3" v-bind="dataFields.grind" v-model="editField" />
                      <DataDisplay class="w-1/3" v-bind="dataFields.roast" v-model="editField" />
                    </div>
                  </div>
                </div>
                <!--Recipe edit-->
                <DataEdit
                  v-if="editField"
                  :recipe="recipe"
                  :brew="brew"
                  :edit-field="editField"
                  @close="editField = null"
                />
                <!--Recipe brew time-->
                <div class="mt-2 px-4">
                  <p class="text-xs text-right" :class="[running ? 'text-white' : 'text-gray-400 dark:text-gray-400']">
                    Brew Time: {{ formatDuration(recipe.duration) }}
                  </p>
                </div>
              </div>
              <!--Recipe steps-->
              <div :class="{ 'divide-y': !inProcess }">
                <RecipeStepListItem
                  v-for="(step, i) in recipe.steps"
                  :key="i"
                  :step="step"
                  :recipe="recipe"
                  :current="duration"
                  :running="running"
                >
                  <PlaybackControls
                    class="mt-3"
                    :running="running"
                    :current="duration"
                    :start="step.start"
                    :end="step.end"
                    hide-play-pause
                    hide-prev-next
                    @update:current="updateDuration"
                    @reset="stepReset(i)"
                  />
                </RecipeStepListItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!--App footer-->
    <div class="relative flex-shrink-0 pt-4 px-4 sm:px-0" :class="{ 'border-t': !isBottom }">
      <div class="w-full sm:max-w-xl mx-auto">
        <PlaybackControls
          v-if="inProcess"
          class="mb-2"
          is-lg
          :running="running"
          :current="duration"
          :start="0"
          :end="recipe.duration"
          :hide-reset="running"
          @update:current="updateDuration"
          @skip-prev="stepPrev"
          @skip-next="stepNext"
          @play="toggleRunning"
          @pause="toggleRunning"
          @reset="resetBrew"
        />
        <div v-else class="flex justify-center items-center w-full text-sm mb-4">
          <!--Reset button-->
          <BaseButton v-if="hasCompleted" is-lg bordered @click="resetBrew">
            <IconRefreshCw class="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Reset</span>
          </BaseButton>
          <!--Play button-->
          <BaseButton v-else is-lg bordered @click="toggleRunning">
            <IconPlay class="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Let's Brew</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
