<script setup lang="ts">
import { computed, watch, ref, toRef, type ComponentPublicInstance } from 'vue';
import VRuntimeTemplate from 'vue3-runtime-template';

import { formatDuration, formatTimerDuration } from '@/util/duration';
import { useAppState } from '@/use/appState';
import type { Recipe } from '@/use/recipe';

interface RecipeStep {
  summary: string;
  type: string;
  description?: string;
  imgUrl?: string;
  start: number;
  end: number;
}

const props = defineProps<{
  step: RecipeStep;
  recipe: Recipe;
  current: number;
  running: boolean;
}>();

const emit = defineEmits(['update:current']);

const { brewer } = useAppState();

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
  if (inProcess.value) return true;
  if (!brewer.hasStarted.value) return true;
  if (props.step.type === 'complete' && brewer.hasCompleted.value) return true;
  return false;
});

const listItem = ref<ComponentPublicInstance | null>(null);
function scrollToView() {
  setTimeout(() => {
    if (!listItem.value) return;
    const el = listItem.value.$el;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 20);
}

watch([inProcess, toRef(props, 'running')], () => {
  if (inProcess.value && props.running) {
    scrollToView();
  }
});

const progressStyle = computed(() => {
  if (!progress) return {};
  return {
    width: `${progress.value * 100}%`,
  };
});

function progressClick(e: MouseEvent) {
  if (e.target == null) return;
  const target = e.target as HTMLElement;
  const updatedProgress = (e.offsetX - target.offsetLeft) / target.offsetWidth;
  emit('update:current', props.step.start + totalDuration.value * updatedProgress);
}
</script>
<template>
  <div class="relative w-full py-4" :class="[active ? '' : 'opacity-25']" ref="listItem">
    <div class="flex justify-between items-start">
      <div class="flex-grow">
        <h3 class="text-lg"><v-runtime-template :template="step.summary" /></h3>
        <p v-if="step.description" :inner-html="step.description" class="text-sm text-gray-600 dark:text-gray-300 mt-2">
          <v-runtime-template :template="step.description" />
        </p>
      </div>
      <div v-if="completed">
        <IconCheckCircle />
      </div>
      <template v-else-if="totalDuration > 0">
        <div v-if="inProcess" class="text-lg select-none">
          {{ currentDurationLabel }}
        </div>
        <div v-else class="text-lg select-none">
          {{ totalDurationLabel }}
        </div>
      </template>
    </div>
    <img v-if="step.imgUrl" :src="step.imgUrl" :alt="step.summary" class="block w-full mt-4 shadow-md" />
    <div v-if="progress && progress >= 0 && progress <= 1" class="absolute left-0 right-0 bottom-0 h-4 z-10">
      <div class="relative w-full h-full">
        <div
          class="absolute inset-0 border-b-4 border-gray-200 dark:border-gray-800 hover:cursor-pointer"
          @click="progressClick"
        />
        <div
          class="absolute inset-0 border-b-4 border-black dark:border-white pointer-events-none"
          :style="progressStyle"
        />
      </div>
    </div>
  </div>
</template>
