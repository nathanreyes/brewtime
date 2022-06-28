import { watch } from 'vue';
import type { Ref } from 'vue';

export type DisplayMode = 'light' | 'dark' | 'auto';

export function useDisplayMode(mode: Ref<DisplayMode>) {
  function refreshDisplayMode() {
    const classes = document.documentElement.classList;
    if (mode.value === 'dark') {
      classes.add('dark');
    } else {
      classes.remove('dark');
    }
  }

  watch(
    () => mode.value,
    () => refreshDisplayMode(),
    { immediate: true }
  );
}
