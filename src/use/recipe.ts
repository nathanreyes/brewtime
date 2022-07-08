import { computed, reactive, toRefs } from 'vue';
import { getDurationFromData } from '@/util/duration';
import { roundTenth } from '@/util/math';

export type RecipeField = 'waterAmount' | 'waterTemp' | 'coffeeAmount' | 'coffeeGrind' | 'ratio' | 'roast';
interface RecipeStepConfig {
  summary: string;
  type: string;
  description?: string;
  imgUrl?: string;
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
  url: string;
  roast: string;
  waterAmount: number;
  waterTemp: number;
  coffeeAmount: number;
  coffeeGrind: string;
  ratio: number;
  steps: RecipeStepConfig[];
}

export interface Recipe {
  id: string;
  name: string;
  brewId: string;
  author: string;
  notes: string;
  url: string;
  urlHostname: string;
  waterAmount: number;
  waterAmountLabel: string;
  waterTemp: number;
  waterTempLabel: string;
  coffeeAmount: number;
  coffeeAmountLabel: string;
  coffeeGrind: string;
  coffeeGrindLabel: string;
  ratio: number;
  ratioLabel: string;
  roast: string;
  roastLabel: string;
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

  const recipe = reactive({
    ...recipeConfig,
    steps,
    duration,
  });

  const waterAmountLabel = computed(() => `${roundTenth(recipe.waterAmount)}g`);
  const waterTempLabel = computed(() => `${roundTenth(recipe.waterTemp)}F`);
  const coffeeAmountLabel = computed(() => `${roundTenth(recipe.coffeeAmount)}g`);
  const coffeeGrindLabel = computed(() => recipe.coffeeGrind);
  const ratioLabel = computed(() => roundTenth(recipe.ratio).toString());
  const roastLabel = computed(() => recipe.roast);
  const urlHostname = computed(() => {
    if (!recipe.url) return '';
    const url = new URL(recipe.url);
    return url.hostname;
  });

  const result = {
    ...toRefs(recipe),
    waterAmountLabel,
    waterTempLabel,
    coffeeAmountLabel,
    coffeeGrindLabel,
    ratioLabel,
    roastLabel,
    urlHostname,
  };
  return reactive(result);
}

export function formatFieldValue(field: RecipeField, value: number | string) {
  switch (field) {
    default:
      return value.toString();
  }
}

// export function useRecipe(recipeConfig: RecipeConfig): Recipe {
//   const recipe = deserializeRecipe(recipeConfig);
//   return recipe;
// }
