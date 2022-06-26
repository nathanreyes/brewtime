<script setup lang="ts">
import { computed } from 'vue';
import IconCheck from '../components/icons/IconCheck.vue';
import { formatDuration } from '../util/duration';

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

const currentDurationLabel = computed(() => formatDuration(currentDuration.value));
const totalDurationLabel = computed(() => formatDuration(props.step.end - props.step.start));

const started = computed(() => props.current > props.step.start);
const completed = computed(() => props.current > props.step.end);
const active = computed(() => started.value && !completed.value);

const progressStyle = computed(() => {
  return {
    width: `${(currentDuration.value / totalDuration.value) * 100}%`,
  };
});

const firstOrActive = computed(() => active.value || (!completed.value && props.position === 1));

const showDescription = computed(() => {
  return props.step.description && firstOrActive.value;
});
</script>
<template>
  <div class="relative w-full border-b py-4">
    <div class="flex justify-between items-start">
      <div class="flex-grow">
        <h3 class="text-lg" :class="[firstOrActive ? '' : 'text-gray-300']">{{ step.summary }}</h3>
        <p v-if="showDescription" class="text-sm text-gray-500 mt-2">{{ step.description }}</p>
      </div>
      <div v-if="completed">
        <IconCheck />
      </div>
      <div v-else-if="active" class="text-lg font-medium">
        {{ currentDurationLabel }}
      </div>
      <div v-else class="text-lg font-medium" :class="[firstOrActive ? '' : 'text-gray-300']">
        {{ totalDurationLabel }}
      </div>
    </div>
    <div v-if="active" class="absolute h-full left-0 top-0 border-b-4 border-black" :style="progressStyle"></div>
  </div>
</template>
