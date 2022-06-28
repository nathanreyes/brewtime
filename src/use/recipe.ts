import { computed, reactive } from 'vue';
import { getDurationFromData } from '@/util/duration';

interface RecipeStepConfig {
  summary: string;
  type: string;
  description?: string;
  gifUrl?: string;
  seconds?: number;
  minutes?: number;
}

interface RecipeStep extends RecipeStepConfig {
  start: number;
  end: number;
}

export interface RecipeConfig {
  id: string;
  name: string;
  brewId: string;
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

export interface Recipe {
  id: string;
  name: string;
  brewId: string;
  author: string;
  notes: string;
  grind: string;
  roast: string;
  waterAmount: string;
  waterTemp: string;
  coffeeAmount: string;
  ratio: string;
  steps: RecipeStep[];
  duration: number;
}

export function serializeRecipe(recipe: Recipe) {
  return recipe;
}

export function deserializeRecipe(recipeConfig: RecipeConfig) {
  let duration = 0;
  const steps = recipeConfig.steps.map((step) => {
    const start = duration;
    duration += getDurationFromData(step);
    const end = duration;
    return {
      ...step,
      start,
      end,
    };
  });
  return {
    ...recipeConfig,
    steps,
    duration,
  };
}

export function useRecipe(recipeConfig: RecipeConfig): Recipe {
  return deserializeRecipe(recipeConfig);
}
