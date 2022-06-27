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
  type: string;
  description?: string;
  gifUrl?: string;
  start: number;
  end: number;
}

export interface Recipe {
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
  duration: number;
}

export function useRecipe(recipe: RecipeConfig): Recipe {
  let totalDuration = 0;
  const steps = recipe.steps.map((step) => {
    const start = totalDuration;
    totalDuration += getDurationFromData(step);
    const end = totalDuration;
    return {
      ...step,
      start,
      end,
    };
  });
  const duration = computed(() => {
    if (!steps?.length) return 0;
    return steps[steps.length - 1].end;
  });
  return reactive<Recipe>({
    ...recipe,
    steps,
    duration,
  });
}
