<script setup lang="ts">
import { computed } from 'vue';
import ListItem from './ListItem.vue';
import IconCheckCircle from '../components/icons/IconCheckCircle.vue';
import { formatDuration, formatTimerDuration } from '../util/duration';

interface RecipeStep {
  summary: string;
  type: string;
  description?: string;
  gifUrl?: string;
  start: number;
  end: number;
}

const props = defineProps<{
  step: RecipeStep;
  current: number;
  running: boolean;
}>();

const emit = defineEmits(['update:current']);

const currentDuration = computed(() => props.current - props.step.start);
const totalDuration = computed(() => props.step.end - props.step.start);

const currentDurationLabel = computed(() => formatTimerDuration(currentDuration.value, totalDuration.value));
const totalDurationLabel = computed(() => formatDuration(props.step.end - props.step.start));

const started = computed(() => props.current > props.step.start);
const completed = computed(() => props.current > props.step.end);
const inProcess = computed(() => started.value && !completed.value);

const progress = computed(() => {
  return currentDuration.value / totalDuration.value;
});

const active = computed(() => {
  if (!props.running) return true;
  if (inProcess.value) return true;
  if (props.step.type === 'setup' && !started) return true;
  if (props.step.type === 'complete' && completed.value) return true;
  return false;
});

const showGif = computed(() => {
  if (!props.step.gifUrl) return false;
  if (props.step.type === 'complete' && !completed.value) return false;
  return active.value;
});

function updateProgress(progress: number) {
  emit('update:current', props.step.start + totalDuration.value * progress);
}
</script>
<template>
  <ListItem
    :summary="step.summary"
    :description="step.description"
    :progress="progress"
    :class="[active ? '' : 'opacity-25']"
    @update:progress="updateProgress"
  >
    <template #right>
      <div v-if="completed">
        <IconCheckCircle />
      </div>
      <div v-else-if="running" class="text-lg font-medium">
        {{ currentDurationLabel }}
      </div>
      <div v-else class="text-lg font-medium" :class="[active ? '' : 'text-gray-300 dark:text-gray-600']">
        {{ totalDurationLabel }}
      </div>
    </template>
    <template v-if="showGif" #details>
      <img :src="step.gifUrl" :alt="step.summary" class="block w-full mt-4" />
    </template>
  </ListItem>
</template>
