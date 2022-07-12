import { computed, watch } from 'vue';
import brews from '@/content/brews.json';
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
  let _recipe = recipe;

  const stopwatch = useStopwatch();
  const { hasStarted, running, duration, startRunning, stopRunning, toggleRunning, durationLabel, reset } = stopwatch;
  const hasCompleted = computed(() => duration.value >= _recipe.duration + 10);
  const inProcess = computed(() => hasStarted.value && !hasCompleted.value);
  const brew = computed(() => brews.find((b) => b.id === _recipe.brewId));

  function loadRecipe(recipe: Recipe) {
    if (!recipe) return;
    stopRunning();
    reset();
    _recipe = recipe;
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
