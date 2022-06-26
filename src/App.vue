<script setup lang="ts">
import { computed } from 'vue';

import useStopwatch from './use/stopwatch';
import defaultRecipes from './util/defaultRecipes';
import IconCoffee from './components/icons/IconCoffee.vue';
import IconPlay from './components/icons/IconPlay.vue';
import IconPause from './components/icons/IconPause.vue';
import RecipeStep from './components/RecipeStep.vue';
import IconMenu from './components/icons/IconMenu.vue';
import IconRefreshCw from './components/icons/IconRefreshCw.vue';
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
  grindSize: string;
  waterAmount: string;
  waterTemp: string;
  coffeeAmount: string;
  ratio: string;
  steps: RecipeStep[];
}

const { running, totalDuration, toggleRunning, durationLabel, reset } = useStopwatch();

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
</script>

<template>
  <div class="w-full max-w-xl h-screen mx-auto flex flex-col font-mono px-6" style="max-height: 900px">
    <header class="flex-shrink-0 h-20 flex justify-between items-center px-4 py-4">
      <div class="flex-grow flex justify-center items-center space-x-3">
        <IconCoffee class="text-gray-400 mb-1" />
        <h2 class="font-bold text-sm tracking-widest text-gray-600 text-center uppercase">Brewtime</h2>
      </div>
    </header>
    <main class="flex-grow flex flex-col">
      <div class="flex-grow">
        <div class="border-b">
          <h3 class="text-xl text-center">{{ activeRecipe.name }}</h3>
          <p v-if="activeRecipe.author" class="text-xs text-gray-400 text-center mt-2">by {{ activeRecipe.author }}</p>
          <div class="flex flex-wrap justify-around border-y text-sm mt-4">
            <div class="flex flex-col items-center space-y-2 w-24 my-3">
              <p class="font-semibold">{{ activeRecipe.waterAmount }}</p>
              <p class="text-xs tracking-wide text-gray-500 uppercase">Water Amt</p>
            </div>
            <div class="flex flex-col items-center space-y-2 w-24 my-3">
              <p class="font-semibold">{{ activeRecipe.coffeeAmount }}</p>
              <p class="text-xs tracking-wide text-gray-500 uppercase">Coffee Amt</p>
            </div>
            <div class="flex flex-col items-center space-y-2 w-24 my-3">
              <p class="font-semibold">{{ activeRecipe.ratio }}</p>
              <p class="text-xs tracking-wide text-gray-500 uppercase">Ratio</p>
            </div>
            <div class="flex flex-col items-center space-y-2 w-24 my-3">
              <p class="font-semibold">{{ activeRecipe.waterTemp }}</p>
              <p class="text-xs tracking-wide text-gray-500 uppercase">Water Temp</p>
            </div>
            <div class="flex flex-col items-center space-y-2 w-24 my-3">
              <p class="font-semibold">{{ activeRecipe.grindSize }}</p>
              <p class="text-xs tracking-wide text-gray-500 uppercase">Grind Size</p>
            </div>
          </div>
          <div class="mt-2 mb-2">
            <textarea class="block text-sm w-full p-2" rows="2" placeholder="Personal notes" />
          </div>
        </div>
        <div>
          <RecipeStep
            v-for="(step, i) in activeRecipe.steps"
            :key="i"
            :position="i + 1"
            :step="step"
            :running="running"
            :current="totalDuration"
          />
        </div>
      </div>
      <div class="flex justify-between items-end flex-shrink-0 py-8">
        <div class="w-12">
          <button
            class="inline-flex justify-center items-center w-12 h-12 border-2 border-black rounded-full hover:bg-gray-50"
            @click="reset"
          >
            <IconMenu />
          </button>
        </div>
        <button
          class="inline-flex flex-col justify-center items-center w-32 h-32 space-y-2 border-2 border-black rounded-full"
          :class="[
            running ? 'bg-black hover:bg-gray-900 text-white shadow-lg' : 'bg-white hover:bg-gray-50 text-black',
          ]"
          @click="toggleRunning"
        >
          <IconPause v-if="running" />
          <IconPlay v-else />
          <div class="flex items-center text-lg font-semibold" :class="[running ? 'text-white' : 'text-gray-900']">
            {{ durationLabel }}
          </div>
        </button>
        <div class="w-12">
          <button
            v-if="!running && totalDuration > 0"
            class="inline-flex justify-center items-center w-12 h-12 border-2 border-black rounded-full hover:bg-gray-50"
            @click="reset"
          >
            <IconRefreshCw />
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
