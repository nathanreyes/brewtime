import { ref, computed, watch } from 'vue';
import brewMethods from '@/content/brewMethods.json';
import { useStopwatch } from './stopwatch';
import type { Recipe } from './recipe';

export interface Brew {
  id: string;
  name: string;
  category: string;
  imgUrl: string;
  capacity: number;
}

export function useBrewer(recipe: Recipe) {
  const _recipe = ref(recipe);

  const stopwatch = useStopwatch();
  const { hasStarted, running, duration, startRunning, stopRunning, toggleRunning, durationLabel, reset } = stopwatch;
  const hasCompleted = computed(() => duration.value >= _recipe.value.duration + 10);
  const inProcess = computed(() => hasStarted.value && !hasCompleted.value);
  const brew = computed(() => brewMethods.find((b) => b.id === _recipe.value.brewId));

  function loadRecipe(recipe: Recipe) {
    if (!recipe) return;
    stopRunning();
    reset();
    _recipe.value = recipe;
  }

  watch(
    () => hasCompleted.value,
    () => {
      stopRunning();
    }
  );

  return {
    recipe: _recipe,
    brew,
    hasStarted,
    inProcess,
    hasCompleted,
    running,
    duration,
    loadRecipe,
    startRunning,
    stopRunning,
    toggleRunning,
    durationLabel,
    reset,
  };
}
