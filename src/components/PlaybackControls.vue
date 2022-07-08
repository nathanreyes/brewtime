<script setup lang="ts">
import { computed } from 'vue';
import { formatDuration, formatTimerDuration } from '@/util/duration';

const props = defineProps<{
  running: boolean;
  current: number;
  start: number;
  end: number;
  isLg?: boolean;
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
const sizeClass = computed(() => (props.isLg ? 'w-6 h-6' : 'w-5 h-5'));
</script>

<template>
  <div>
    <ProgressBar v-model="progress" />
    <div class="flex justify-between items-center" :class="[isLg ? 'mt-4' : 'mt-3']">
      <div class="flex justify-start items-center w-2/5 space-x-4">
        <button @click="$emit('skip-back')"><IconSkipBack :class="sizeClass" /></button>
        <button @click="$emit('skip-forward')"><IconSkipForward :class="sizeClass" /></button>
        <button @click="$emit('reset')"><IconRefreshCw :class="sizeClass" /></button>
      </div>
      <div class="flex justify-center items-center w-1/5">
        <button v-if="running" @click="$emit('pause')"><IconPause :class="sizeClass" /></button>
        <button v-else @click="$emit('play')"><IconPlay :class="sizeClass" /></button>
      </div>
      <div class="flex justify-end items-center w-2/5">
        <p class="text-center select-none" :class="[isLg ? '' : 'text-sm']">{{ durationLabel }} / {{ totalLabel }}</p>
      </div>
    </div>
  </div>
</template>
