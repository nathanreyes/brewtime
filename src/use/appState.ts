import { ref, computed } from 'vue';
import { getDurationFromData } from '@/util/duration';
import defaultRecipes from '@/util/defaultRecipes';
import { useDarkMode } from '@/use/darkMode';

interface RecipeStepConfig {
  summary: string;
  description?: string;
  seconds?: number;
  minutes?: number;
}

export interface RecipeConfig {
  name: string;
  type: string;
  author: string;
  notes: string;
  grind: string;
  roast: string;
  waterAmount: string;
  waterTemp: string;
  coffeeAmount: string;
  ratio: string;
  steps: RecipeStepConfig[];
}

interface RecipeStep {
  summary: string;
  description?: string;
  start: number;
  end: number;
}

interface Recipe {
  name: string;
  type: string;
  author: string;
  notes: string;
  grind: string;
  roast: string;
  waterAmount: string;
  waterTemp: string;
  coffeeAmount: string;
  ratio: string;
  steps: RecipeStep[];
}

export interface AppState {
  recipes: RecipeConfig[];
  isDarkMode: boolean;
}

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
const isDarkMode = ref(false);

useDarkMode(isDarkMode);

export function useAppState() {
  return { recipes, activeRecipe, isDarkMode };
}
