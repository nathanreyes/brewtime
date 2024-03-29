<script setup lang="ts">
import { computed } from 'vue';
import { formatDuration } from '@/util/duration';

const props = defineProps<{
  running: boolean;
  current: number;
  start: number;
  end: number;
  hidePlayPause?: boolean;
  hidePrevNext?: boolean;
  hideReset?: boolean;
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
</script>

<template>
  <div>
    <ProgressBar v-model="progress" />
    <div class="flex justify-between items-center mt-1">
      <div class="flex justify-start items-center w-2/5">
        <template v-if="!hidePrevNext">
          <IconButton @click="$emit('skip-prev')">
            <IconArrowUp />
          </IconButton>
          <IconButton @click="$emit('skip-next')"><IconArrowDown /></IconButton>
        </template>
        <IconButton v-if="!hideReset" @click="$emit('reset')"><IconRefreshCw /></IconButton>
      </div>
      <div class="flex justify-center items-center w-1/5">
        <template v-if="!hidePlayPause">
          <IconButton v-if="running" @click="$emit('pause')"><IconPause /></IconButton>
          <IconButton v-else @click="$emit('play')"><IconPlay /></IconButton>
        </template>
      </div>
      <div class="flex justify-end items-center w-2/5">
        <p class="space-x-1 select-none">
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
