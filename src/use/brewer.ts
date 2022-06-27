import { computed, watch } from 'vue';
import { useStopwatch } from './stopwatch';
import type { Ref } from 'vue';
import type { Recipe } from './recipe';

export function useBrewer(recipe: Ref<Recipe>) {
  const _recipe = recipe;

  const stopwatch = useStopwatch();
  const { hasStarted, running, duration, startRunning, stopRunning, toggleRunning, durationLabel, reset } = stopwatch;
  const hasCompleted = computed(() => duration.value >= _recipe.value.duration);

  watch(
    () => hasCompleted.value,
    () => {
      stopRunning();
    }
  );

  return {
    recipe: _recipe,
    hasStarted,
    hasCompleted,
    running,
    duration,
    startRunning,
    stopRunning,
    toggleRunning,
    durationLabel,
    reset,
  };
}
