import { onUnmounted, reactive, ref, watch } from 'vue';
import isTouchDevice from '@/util/isTouchDevice';
import type { Ref } from 'vue';

type RelativePosition = 'start' | 'center' | 'end';

interface DragStateOptions {
  fromX?: RelativePosition;
  fromY?: RelativePosition;
  triggerX?: boolean | number;
  triggerY?: boolean | number;
  triggerDuration?: number;
}

type Point = { x: number; y: number };

interface DragState {
  isTouch: boolean;
  waiting: boolean;
  tracking: boolean;
  origin: Point | null;
  originRaw: Point | null;
  current: Point | null;
  originDate: Date | null;
}

export function useDragState(target: Ref<HTMLElement | SVGElement | null | undefined>, opts: DragStateOptions = {}) {
  const state = reactive<DragState>({
    isTouch: false,
    waiting: false,
    tracking: false,
    origin: null,
    originRaw: null,
    current: null,
    originDate: null,
  });

  const offset = ref<{ x: number; y: number } | null>(null);

  function updateOffset() {
    if (state.current == null || state.origin == null) return;
    offset.value = {
      x: state.current.x - state.origin.x,
      y: state.current.y - state.origin.y,
    };
  }

  function startTracking() {
    state.waiting = false;
    state.tracking = true;
  }

  function stopTracking() {
    state.waiting = false;
    state.tracking = false;
    state.current = null;
    state.origin = null;
    state.originRaw = null;
    offset.value = null;
  }

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

  function onTargetStart(evt: MouseEvent | Touch) {
    if (state.waiting || state.tracking || target.value == null) return;
    state.origin = getOriginFromEventOrTouch(evt);
    state.originRaw = { x: evt.pageX, y: evt.pageY };
    state.waiting = true;
  }

  function onDocumentMove(evt: MouseEvent | Touch) {
    if (!(state.waiting || state.tracking) || state.originRaw == null || target.value == null) return;
    state.current = { x: evt.pageX, y: evt.pageY };
    if (state.tracking) {
      updateOffset();
    } else if (state.waiting) {
      if (opts.triggerDuration != null && state.originDate != null) {
        const duration = Date.now() - state.originDate.getTime();
        if (duration < opts.triggerDuration) return;
      }
      let start = false;
      const xDelta = state.current.x - state.originRaw.x;
      const yDelta = state.current.y - state.originRaw.y;
      if (opts.triggerX != null && (opts.triggerX === true || opts.triggerX < Math.abs(xDelta / yDelta))) {
        start = true;
      }
      if (opts.triggerY != null && (opts.triggerY === true || opts.triggerY < Math.abs(yDelta / xDelta))) {
        start = true;
      }
      if (start) {
        startTracking();
        updateOffset();
      } else {
        stopTracking();
      }
    }
  }

  function onDocumentEnd() {
    if (!state.tracking) return;
    state.tracking = false;
  }

  // #region Mouse events

  function onTargetMousedown(evt: Event) {
    onTargetStart(evt as MouseEvent);
  }

  function onDocumentMousemove(evt: MouseEvent) {
    onDocumentMove(evt);
  }

  function onDocumentMouseup() {
    onDocumentEnd();
  }

  // #endregion Mouse events

  // #region Touch events

  function onTargetTouchstart(evt: Event) {
    onTargetStart((evt as TouchEvent).touches[0]);
  }

  function onDocumentTouchmove(evt: TouchEvent) {
    onDocumentMove((evt as TouchEvent).touches[0]);
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
