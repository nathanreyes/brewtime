import { onUnmounted, reactive, watch } from 'vue';
import isTouchDevice from '@/util/isTouchDevice';
import type { Ref } from 'vue';

type RelativePosition = 'start' | 'center' | 'end';

interface DragStateOptions {
  fromX?: RelativePosition;
  fromY?: RelativePosition;
  triggerX?: boolean | number;
  triggerY?: boolean | number;
  triggerDuration?: number;
  maxClickDuration?: number;
}

type Point = { x: number; y: number };

interface DragState {
  isTouch: boolean;
  waiting: boolean;
  tracking: boolean;
  current: Point | null;
  origin: Point | null;
  originRaw: Point | null;
  originDate: Date | null;
  offset: Point | null;
  offsetRaw: Point | null;
}

type DragStateCallback = (state: DragState) => void;

export function useDragState(
  target: Ref<HTMLElement | SVGElement | null | undefined>,
  opts: DragStateOptions = {},
  callback: DragStateCallback
) {
  if (!callback) throw 'Invalid callback provided.';

  const state = reactive<DragState>({
    isTouch: false,
    waiting: false,
    tracking: false,
    current: null,
    origin: null,
    originRaw: null,
    originDate: null,
    offset: null,
    offsetRaw: null,
  });

  function updateOffsetRaw() {
    if (state.current == null || state.originRaw == null) return;
    state.offsetRaw = {
      x: state.current.x - state.originRaw.x,
      y: state.current.y - state.originRaw.y,
    };
  }

  function updateOffset() {
    if (state.current == null || state.origin == null) return;
    state.offset = {
      x: state.current.x - state.origin.x,
      y: state.current.y - state.origin.y,
    };
    callback(state);
  }

  function stopTracking() {
    state.waiting = false;
    state.tracking = false;
    state.current = null;
    state.origin = null;
    state.originDate = null;
    state.originRaw = null;
    state.offset = null;
    state.offsetRaw = null;
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
    state.current = { x: evt.pageX, y: evt.pageY };
    state.origin = getOriginFromEventOrTouch(evt);
    state.originDate = new Date();
    state.originRaw = { x: evt.pageX, y: evt.pageY };
    state.offsetRaw = { x: 0, y: 0 };
    state.waiting = true;
  }

  function onDocumentMove(evt: MouseEvent | Touch) {
    if (!(state.waiting || state.tracking) || state.originRaw == null || target.value == null) return;
    state.current = { x: evt.pageX, y: evt.pageY };
    updateOffsetRaw();
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
        state.waiting = false;
        state.tracking = true;
        updateOffset();
      } else {
        stopTracking();
      }
    }
  }

  function clicked() {
    if (state.originDate == null || state.offsetRaw == null) return false;
    if (state.offsetRaw.x > 0 || state.offsetRaw.y > 0) return false;
    return opts.maxClickDuration == null || Date.now() - state.originDate.getTime() < opts.maxClickDuration;
  }

  function onDocumentEnd() {
    if (!(state.tracking || state.waiting)) return;
    if (clicked()) updateOffset();
    stopTracking();
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

  function onDocumentTouchend() {
    onDocumentEnd();
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

  return state;
}
