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
  position: number;
  current: number;
  running: boolean;
}>();

const currentDuration = computed(() => props.current - props.step.start);
const totalDuration = computed(() => props.step.end - props.step.start);

const currentDurationLabel = computed(() => formatTimerDuration(currentDuration.value, totalDuration.value));
const totalDurationLabel = computed(() => formatDuration(props.step.end - props.step.start));

const started = computed(() => props.current > props.step.start);
const completed = computed(() => props.current > props.step.end);
const active = computed(() => started.value && !completed.value);

const progress = computed(() => {
  return currentDuration.value / totalDuration.value;
});

const showDetails = computed(() => active.value || (!completed.value && (props.position === 1 || !props.running)));
</script>
<template>
  <ListItem
    :summary="step.summary"
    :summary-class="[showDetails ? '' : 'text-gray-300 dark:text-gray-600']"
    :description="step.description"
    :progress="progress"
  >
    <template #right>
      <div v-if="completed">
        <IconCheckCircle />
      </div>
      <div v-else-if="active" class="text-lg font-medium">
        {{ currentDurationLabel }}
      </div>
      <div v-else class="text-lg font-medium" :class="[showDetails ? '' : 'text-gray-300 dark:text-gray-600']">
        {{ totalDurationLabel }}
      </div>
    </template>
    <template v-if="step.gifUrl && showDetails" #details>
      <img :src="step.gifUrl" :alt="step.summary" class="block w-full mt-4" />
    </template>
  </ListItem>
</template>
