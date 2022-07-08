<script setup lang="ts">
import { computed } from 'vue';
import { formatDuration, formatTimerDuration } from '@/util/duration';

const props = defineProps<{
  running: boolean;
  current: number;
  start: number;
  end: number;
}>();
const emit = defineEmits(['update:current', 'skip-back', 'skip-forward', 'reset', 'play', 'pause']);

const duration = computed(() => props.current - props.start);
const total = computed(() => props.end - props.start);

const durationLabel = computed(() => formatDuration(duration.value));
const totalLabel = computed(() => formatDuration(total.value));
const progress = computed({
  get() {
    return duration.value / total.value;
  },
  set(val) {
    emit('update:current', props.start + total.value * val);
  },
});
</script>

<template>
  <div>
    <ProgressBar v-model="progress" />
    <div class="flex justify-between items-center mt-3">
      <div class="flex justify-start items-center w-1/3 space-x-4">
        <button @click="$emit('skip-back')"><IconSkipBack class="w-5 h-5" /></button>
        <button @click="$emit('skip-forward')"><IconSkipForward class="w-5 h-5" /></button>
        <button @click="$emit('reset')"><IconRefreshCw class="w-5 h-5" /></button>
      </div>
      <div class="flex justify-center items-center w-1/3">
        <button v-if="running" @click="$emit('pause')"><IconPause class="w-5 h-5" /></button>
        <button v-else @click="$emit('play')"><IconPlay class="w-5 h-5" /></button>
      </div>
      <div class="flex justify-end items-center w-1/3">
        <p class="text-sm text-center select-none">{{ durationLabel }} / {{ totalLabel }}</p>
      </div>
    </div>
  </div>
</template>
