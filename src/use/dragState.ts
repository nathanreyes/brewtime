import { onMounted, onUnmounted, reactive, ref, computed, watch } from 'vue';
import type { Ref } from 'vue';

type RelativePosition = 'start' | 'center' | 'end';
interface DragStateOptions {
  fromX?: RelativePosition;
  fromY?: RelativePosition;
}

export function useDragState(target: Ref<HTMLElement | SVGElement | null | undefined>, opts: DragStateOptions = {}) {
  const state = reactive({
    tracking: false,
    origin: { x: 0, y: 0 },
  });

  const offset = ref<{ x: number; y: number } | null>(null);

  function getOriginFromEvent(evt: MouseEvent) {
    const origin = { x: 0, y: 0 };
    if (evt.target == null) return origin;
    const rect = (evt.target as HTMLElement).getBoundingClientRect();
    switch (opts.fromX) {
      case 'start':
        origin.x = rect.left;
        break;
      case 'center':
        origin.x = rect.left + 0.5 * rect.width;
        break;
      case 'end':
        origin.x = rect.left + rect.width;
        break;
      default:
        origin.x = evt.pageX;
        break;
    }
    switch (opts.fromY) {
      case 'start':
        origin.y = rect.top;
        break;
      case 'center':
        origin.y = rect.top + 0.5 * rect.height;
        break;
      case 'end':
        origin.y = rect.top + rect.height;
        break;
      default:
        origin.y = evt.pageY;
        break;
    }
    return origin;
  }

  function onTargetMousedown(evt: Event) {
    if (state.tracking || target.value == null) return;
    const e = evt as MouseEvent;
    state.origin = getOriginFromEvent(e);
    state.tracking = true;
    const x = e.pageX - state.origin.x;
    const y = e.pageY - state.origin.y;
    offset.value = { x, y };
    e.stopPropagation();
  }

  function onDocumentMousemove(evt: MouseEvent) {
    if (!state.tracking || target.value == null) return;
    const x = evt.pageX - state.origin.x;
    const y = evt.pageY - state.origin.y;
    offset.value = { x, y };
    evt.stopPropagation();
  }

  function onDocumentMouseup() {
    if (!state.tracking) return;
    state.tracking = false;
  }

  function stopListeners() {
    if (target.value) {
      target.value.removeEventListener('mousedown', onTargetMousedown);
    }
    document.removeEventListener('mousemove', onDocumentMousemove);
    document.removeEventListener('mouseup', onDocumentMouseup);
  }

  const stopWatch = watch(
    () => target.value,
    (val, oldVal) => {
      if (oldVal != null) {
        oldVal.removeEventListener('mousedown', onTargetMousedown);
      }
      if (val == null) return;
      val.addEventListener('mousedown', onTargetMousedown);
    },
    {
      immediate: true,
    }
  );

  const cleanup = () => {
    stopListeners();
    stopWatch();
  };

  onMounted(() => {
    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
  });

  onUnmounted(() => cleanup());

  return {
    offset,
  };
}
