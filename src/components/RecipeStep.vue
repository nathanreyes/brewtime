<script setup lang="ts">
import { computed, watch } from 'vue';
import IconCheck from '../components/icons/IconCheck.vue';
import { formatDuration, formatTimerDuration } from '../util/duration';

interface RecipeStep {
  summary: string;
  description?: string;
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

const progressStyle = computed(() => {
  return {
    width: `${(currentDuration.value / totalDuration.value) * 100}%`,
  };
});

const showDetails = computed(() => active.value || (!completed.value && (props.position === 1 || !props.running)));

const showDescription = computed(() => {
  return props.step.description && showDetails.value;
});

watch(
  () => completed.value,
  (val) => {
    if (val) {
      console.log('!done');
    }
  }
);
</script>
<template>
  <div class="relative w-full border-b py-4 px-4">
    <div class="flex justify-between items-start">
      <div class="flex-grow">
        <h3 class="text-lg" :class="[showDetails ? '' : 'text-gray-300 dark:text-gray-600']">{{ step.summary }}</h3>
        <p v-if="showDescription" class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ step.description }}</p>
      </div>
      <div v-if="completed">
        <IconCheck />
      </div>
      <div v-else-if="active" class="text-lg font-medium">
        {{ currentDurationLabel }}
      </div>
      <div v-else class="text-lg font-medium" :class="[showDetails ? '' : 'text-gray-300 dark:text-gray-600']">
        {{ totalDurationLabel }}
      </div>
    </div>
    <div
      v-if="active"
      class="absolute h-full left-0 top-0 border-b-4 border-black bg-gray-100 dark:border-white dark:bg-gray-700 -z-10"
      :style="progressStyle"
    ></div>
  </div>
</template>
