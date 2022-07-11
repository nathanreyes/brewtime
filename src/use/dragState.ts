import { onUnmounted, reactive, ref, watch } from 'vue';
import isTouchDevice from '@/util/isTouchDevice';
import type { Ref } from 'vue';

type RelativePosition = 'start' | 'center' | 'end';

interface DragStateOptions {
  fromX?: RelativePosition;
  fromY?: RelativePosition;
}

export function useDragState(target: Ref<HTMLElement | SVGElement | null | undefined>, opts: DragStateOptions = {}) {
  const state = reactive({
    isTouch: false,
    tracking: false,
    origin: { x: 0, y: 0 },
  });

  const offset = ref<{ x: number; y: number } | null>(null);

  function getOriginFromEventOrTouch(evt: MouseEvent | Touch) {
    const origin = { x: 0, y: 0 };
    if (evt.target == null) return origin;
    const rect = (evt.target as HTMLElement).getBoundingClientRect();
    const { pageX, pageY } = evt;
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
        origin.x = pageX;
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
        origin.y = pageY;
        break;
    }
    return origin;
  }

  // #region Mouse events

  function onTargetMousedown(evt: Event) {
    if (state.tracking || target.value == null) return;
    const e = evt as MouseEvent;
    state.origin = getOriginFromEventOrTouch(e);
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
  }

  function onDocumentMouseup() {
    if (!state.tracking) return;
    state.tracking = false;
  }

  // #endregion Mouse events

  // #region Touch events

  function onTargetTouchstart(evt: Event) {
    if (state.tracking || target.value == null) return;
    const touch = (evt as TouchEvent).touches[0];
    state.origin = getOriginFromEventOrTouch(touch);
    state.tracking = true;
    const x = touch.pageX - state.origin.x;
    const y = touch.pageY - state.origin.y;
    offset.value = { x, y };
    evt.preventDefault();
    evt.stopPropagation();
  }

  function onDocumentTouchmove(evt: TouchEvent) {
    if (!state.tracking || target.value == null) return;
    const touch = (evt as TouchEvent).touches[0];
    const x = touch.pageX - state.origin.x;
    const y = touch.pageY - state.origin.y;
    offset.value = { x, y };
    evt.preventDefault();
    evt.stopPropagation();
  }

  function onDocumentTouchend(evt: TouchEvent) {
    if (!state.tracking || target.value == null) return;
    state.tracking = false;
  }

  // #endregion Touch events

  function stopListeners(el: HTMLElement | SVGElement | null | undefined) {
    if (state.isTouch) {
      if (el) el.removeEventListener('touchstart', onTargetTouchstart);
      document.removeEventListener('touchmove', onDocumentTouchmove);
      document.removeEventListener('touchend', onDocumentTouchend);
    } else {
      if (el) el.removeEventListener('mousedown', onTargetMousedown);
      document.removeEventListener('mousemove', onDocumentMousemove);
      document.removeEventListener('mouseup', onDocumentMouseup);
    }
  }

  // Watch target to register event handlers
  const stopWatch = watch(
    () => target.value,
    (val, oldVal) => {
      stopListeners(oldVal);
      if (val == null) return;
      state.isTouch = isTouchDevice();
      if (state.isTouch) {
        val.addEventListener('touchstart', onTargetTouchstart);
        document.addEventListener('touchmove', onDocumentTouchmove);
        document.addEventListener('touchend', onDocumentTouchend);
      } else {
        val.addEventListener('mousedown', onTargetMousedown);
        document.addEventListener('mousemove', onDocumentMousemove);
        document.addEventListener('mouseup', onDocumentMouseup);
      }
    },
    {
      immediate: true,
    }
  );

  const cleanup = () => {
    stopListeners(target.value);
    stopWatch();
  };

  onUnmounted(() => cleanup());

  return {
    offset,
  };
}
