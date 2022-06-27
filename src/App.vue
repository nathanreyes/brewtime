<script setup lang="ts">
import { computed, reactive, toRef } from 'vue';

import useStopwatch from './use/stopwatch';
import { useDarkMode } from './use/darkMode';
import defaultRecipes from './util/defaultRecipes';
import DataDisplay from './components/DataDisplay.vue';
import IconButton from './components/IconButton.vue';
import IconMenu from './components/icons/IconMenu.vue';
import IconCoffee from './components/icons/IconCoffee.vue';
import IconSun from './components/icons/IconSun.vue';
import IconMoon from './components/icons/IconMoon.vue';
import IconEdit from './components/icons/IconEdit.vue';
import IconPlay from './components/icons/IconPlay.vue';
import IconPause from './components/icons/IconPause.vue';
import IconRefreshCw from './components/icons/IconRefreshCw.vue';
import RecipeStep from './components/RecipeStep.vue';
import { getDurationFromData } from './util/duration';

interface RecipeStep {
  summary: string;
  description?: string;
  start: number;
  end: number;
}

interface RecipeStepConfig {
  summary: string;
  description?: string;
  seconds?: number;
  minutes?: number;
}

interface RecipeConfig {
  name: string;
  type: string;
  author: string;
  notes: string;
  grindSize: string;
  waterAmount: string;
  waterTemp: string;
  coffeeAmount: string;
  ratio: string;
  steps: RecipeStepConfig[];
}

interface Recipe {
  name: string;
  type: string;
  author: string;
  notes: string;
  grindSize: string;
  waterAmount: string;
  waterTemp: string;
  coffeeAmount: string;
  ratio: string;
  steps: RecipeStep[];
}

const { running, totalDuration, toggleRunning, durationLabel, reset } = useStopwatch();

const hasStarted = computed(() => totalDuration.value > 0);

function processRecipe(recipe: RecipeConfig): Recipe {
  let totalDuration = 0;
  const steps = recipe.steps.map((step) => {
    const start = totalDuration;
    const duration = getDurationFromData(step);
    totalDuration += duration;
    const end = totalDuration;
    return {
      ...step,
      start,
      end,
    };
  });
  return {
    ...recipe,
    steps,
  };
}

const recipes = computed(() => defaultRecipes.map((r) => processRecipe(r)));
const activeRecipe = computed(() => recipes.value[0]);

const state = reactive({
  isDarkMode: false,
});

function setDarkMode() {
  state.isDarkMode = true;
}

function setLightMode() {
  state.isDarkMode = false;
}

useDarkMode(toRef(state, 'isDarkMode'));
</script>

<template>
  <div class="h-screen flex flex-col mx-auto font-mono dark:bg-black dark:text-white -z-10">
    <!--App header-->
    <header class="flex-shrink-0">
      <div class="flex items-center w-full h-16 sm:max-w-xl px-2 sm:px-0 mx-auto">
        <!--Menu button-->
        <IconButton @click="reset">
          <IconMenu />
        </IconButton>
        <!--App icon/title-->
        <div class="flex-grow flex justify-center items-center space-x-3">
          <IconCoffee class="text-gray-400 mb-1 dark:text-gray-500" />
          <h2 class="font-bold text-sm tracking-widest text-gray-600 dark:text-gray-400 text-center uppercase">
            Brewtime
          </h2>
        </div>
        <!--Light/dark mode-->
        <IconButton v-if="state.isDarkMode" @click="setLightMode">
          <IconSun />
        </IconButton>
        <IconButton v-else @click="setDarkMode">
          <IconMoon />
        </IconButton>
      </div>
    </header>
    <!--App content-->
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <!--Recipe name/author-->
        <div class="flex-shrink-0 pb-4 border-b">
          <h3 class="text-xl text-center dark:text-gray-200">{{ activeRecipe.name }}</h3>
          <!-- <p v-if="activeRecipe.author" class="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 pb-4">
            by {{ activeRecipe.author }}
          </p> -->
        </div>
        <!--Recipe content-->
        <div class="flex-grow flex-shrink overflow-y-auto">
          <template v-if="!(running || hasStarted)">
            <!--Recipe metadata-->
            <div class="flex flex-wrap justify-around border-b text-sm">
              <DataDisplay label="Water Amt" :data="activeRecipe.waterAmount" />
              <DataDisplay label="Coffee Amt" :data="activeRecipe.coffeeAmount" />
              <DataDisplay label="Ratio" :data="activeRecipe.ratio" />
              <DataDisplay label="Water Temp" :data="activeRecipe.waterTemp" />
              <DataDisplay label="Grind Size" :data="activeRecipe.grindSize" />
            </div>
            <!--Recipe notes-->
            <p v-if="activeRecipe.notes" class="text-sm text-gray-500 dark:text-gray-00 p-4 border-b">
              {{ activeRecipe.notes }}
            </p>
          </template>
          <!--Recipe steps-->
          <RecipeStep
            v-for="(step, i) in activeRecipe.steps"
            :key="i"
            :position="i + 1"
            :step="step"
            :running="running"
            :current="totalDuration"
          />
        </div>
        <!--Recipe buttons-->
        <div class="flex-shrink-0 flex justify-center items-stretch border-y border-gray-700 h-16">
          <!--Edit button-->
          <div class="w-1/3" v-if="!running">
            <button class="flex justify-center items-center w-full h-full space-x-4">
              <IconEdit /><span>Edit</span>
            </button>
          </div>
          <!--Play/pause button-->
          <div :class="[running ? 'w-full' : 'w-1/3']">
            <button
              class="flex justify-center items-center w-full h-full space-x-4 border-x border-gray-700"
              :class="[
                running
                  ? 'bg-black hover:bg-gray-900 text-white shadow-lg dark:bg-gray-600 dark:hover:bg-gray-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700',
              ]"
              @click="toggleRunning"
            >
              <template v-if="running"> <IconPause /> </template>
              <template v-else>
                <IconPlay />
              </template>
              <p class="text-lg font-semibold" :class="[running ? 'text-white' : 'text-gray-900 dark:text-gray-200']">
                {{ durationLabel }}
              </p>
            </button>
          </div>
          <div class="w-1/3" v-if="!running">
            <!--Reset button-->
            <button
              class="flex justify-center items-center w-full h-full space-x-4"
              v-if="totalDuration > 0"
              @click="reset"
            >
              <IconRefreshCw /><span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
