import { watch } from 'vue';
import type { Ref } from 'vue';

export function useDarkMode(mode: Ref<boolean>) {
  function refreshDarkMode() {
    const classes = document.documentElement.classList;
    if (mode.value) {
      classes.add('dark');
    } else {
      classes.remove('dark');
    }
  }

  watch(
    () => mode.value,
    () => refreshDarkMode(),
    { immediate: true }
  );
}
