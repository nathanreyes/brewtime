import { reactive, computed, watch, onUnmounted, toRefs } from 'vue';
import type { Ref, ComponentPublicInstance } from 'vue';

export const isClient = typeof window !== 'undefined';
export const defaultWindow = isClient ? window : undefined;

export function useScrollPosition(target: Ref<ComponentPublicInstance | HTMLElement | SVGElement | undefined | null>) {
  const state = reactive({
    position: NaN,
    isTop: false,
    isBottom: false,
    scrollVisible: false,
  });

  const listener = () => {
    if (!targetEl.value) return;
    const { scrollTop, scrollHeight, offsetHeight } = targetEl.value;
    state.position = scrollTop;
    state.isTop = scrollTop <= 0;
    state.isBottom = scrollTop + offsetHeight >= scrollHeight;
    state.scrollVisible = !state.isTop || !state.isBottom;
  };

  const targetEl = computed(() => {
    if (target.value == null) return target.value;
    return ((target.value as ComponentPublicInstance).$el ?? target.value) as HTMLElement;
  });

  const stopListener = () => {
    if (targetEl.value) {
      targetEl.value.removeEventListener('scroll', listener);
    }
  };

  const stopWatch = watch(
    () => target.value,
    (elOrComp) => {
      stopListener();
      if (elOrComp != null) {
        const el: HTMLElement = (elOrComp as ComponentPublicInstance).$el ?? elOrComp;
        el.addEventListener('scroll', listener);
        listener();
      }
    },
    {
      immediate: true,
    }
  );

  const cleanup = () => {
    stopListener();
    stopWatch();
  };

  onUnmounted(() => cleanup());

  return { cleanup, ...toRefs(state) };
}
