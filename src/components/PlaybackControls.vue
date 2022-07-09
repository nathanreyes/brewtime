<script setup lang="ts">
import { computed } from 'vue';
import { formatDuration, formatTimerDuration } from '@/util/duration';
import IconSkipForward from './icons/IconSkipForward.vue';

const props = defineProps<{
  running: boolean;
  current: number;
  start: number;
  end: number;
  isLg?: boolean;
  hidePlayPause?: boolean;
  hidePrevNext?: boolean;
}>();
const emit = defineEmits(['update:current', 'skip-prev', 'skip-next', 'reset', 'play', 'pause']);

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
      <div class="flex justify-start items-center w-2/5">
        <template v-if="!hidePrevNext">
          <IconButton @click="$emit('skip-prev')">
            <IconSkipBack :class="sizeClass" />
          </IconButton>
          <IconButton @click="$emit('skip-next')"><IconSkipForward /></IconButton>
        </template>
        <IconButton @click="$emit('reset')"><IconRefreshCw /></IconButton>
      </div>
      <div class="flex justify-center items-center w-1/5">
        <template v-if="!hidePlayPause">
          <button v-if="running" @click="$emit('pause')"><IconPause :class="sizeClass" /></button>
          <button v-else @click="$emit('play')"><IconPlay :class="sizeClass" /></button>
        </template>
      </div>
      <div class="flex justify-end items-center w-2/5">
        <p class="space-x-1 select-none" :class="[isLg ? '' : 'text-sm']">
          <span>
            {{ durationLabel }}
          </span>
          <span>/</span
          ><span>
            {{ totalLabel }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
