import { ref, nextTick } from 'vue';

export function useProtected() {
  let protecting = ref(false);

  async function protect(fn: Function) {
    if (protecting.value) return;
    fn();
    await nextTick();
    protecting.value = false;
  }

  return { protect, protecting };
}
