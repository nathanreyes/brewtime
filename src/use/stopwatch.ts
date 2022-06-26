import { ref, computed } from 'vue';
import { getDataFromDuration, formatDuration } from '../util/duration';

export default function useStopwatch() {
  const minutes = ref(0);
  const seconds = ref(0);
  const milliseconds = ref(0);
  const start = ref<Date | null>(null);
  const end = ref<Date | null>(null);
  const hasStarted = ref(false);
  const running = ref(false);
  const currentDuration = ref(0);
  const lastDuration = ref(0);
  const totalDuration = computed(() => lastDuration.value + currentDuration.value);
  const durationLabel = computed(() => formatDuration(totalDuration.value));

  function startRunning() {
    start.value = new Date();
    end.value = new Date();
    running.value = true;
  }

  function stopRunning() {
    lastDuration.value += currentDuration.value;
    currentDuration.value = 0;
    running.value = false;
  }

  function toggleRunning() {
    if (running.value) {
      stopRunning();
    } else {
      startRunning();
    }
  }

  function reset() {
    hasStarted.value = false;
    minutes.value = 0;
    seconds.value = 0;
    milliseconds.value = 0;
    lastDuration.value = 0;
    currentDuration.value = 0;
  }

  setInterval(() => {
    if (running.value) {
      end.value = new Date();
      currentDuration.value = end.value.getTime() - start.value!.getTime();
      let totalDurationMs = currentDuration.value + lastDuration.value;
      const data = getDataFromDuration(totalDurationMs);

      minutes.value = data.minutes;
      seconds.value = data.seconds;
      milliseconds.value = data.milliseconds;
    }
  }, 10);

  return {
    startRunning,
    stopRunning,
    toggleRunning,
    reset,
    running: computed(() => running.value),
    totalDuration,
    minutes,
    seconds,
    milliseconds,
    durationLabel,
  };
}
