<script setup lang="ts">
import { computed, watch, ref, toRef } from 'vue';
import VRuntimeTemplate from 'vue3-runtime-template';
import { roundTenth, roundInt } from '@/util/math';
import { formatDuration } from '@/util/duration';
import { useAppState } from '@/use/appState';
import type { Recipe } from '@/use/recipe';

interface RecipeStep {
  summary: string;
  type: string;
  description?: string;
  imgUrls?: string;
  start: number;
  end: number;
}

const props = defineProps<{
  step: RecipeStep;
  recipe: Recipe;
  current: number;
  running: boolean;
}>();

const emit = defineEmits(['activated']);

const { brewer } = useAppState();

const totalDuration = computed(() => props.step.end - props.step.start);
const totalDurationLabel = computed(() => formatDuration(totalDuration.value));

const started = computed(() => props.current > props.step.start);
const completed = computed(() => props.current > props.step.end);
const inProcess = computed(() => started.value && !completed.value);
const isPrepStep = computed(() => props.step.type === 'setup');
const isCompleteStep = computed(() => props.step.type === 'complete');
const isPrepOrComplete = computed(() => isPrepStep.value || isCompleteStep.value);

const active = computed(() => {
  if (inProcess.value) return true;
  if (!brewer.hasStarted.value) return true;
  if (props.step.type === 'complete' && brewer.hasCompleted.value) return true;
  return false;
});

const listItem = ref<HTMLElement | null>(null);
watch([active], () => {
  if (active.value && brewer.hasStarted.value) {
    emit('activated', listItem.value);
  }
});
</script>
<template>
  <div class="w-full py-4 px-4 sm:px-0" :class="{ 'opacity-25': !active }" ref="listItem">
    <div class="flex justify-between items-start">
      <div class="flex-grow">
        <h3 class="text-lg"><v-runtime-template :template="step.summary" /></h3>
        <p v-if="step.description" :inner-html="step.description" class="text-sm text-gray-600 dark:text-gray-300 mt-1">
          <v-runtime-template :template="step.description" />
        </p>
      </div>
      <div v-if="completed">
        <IconCheckCircle />
      </div>
      <div v-else-if="!inProcess && !isPrepOrComplete" class="select-none">
        {{ totalDurationLabel }}
      </div>
    </div>
    <div v-show="active">
      <img
        v-for="url in step.imgUrls"
        :key="url"
        :src="url"
        :alt="step.summary"
        class="block w-full mt-3 shadow-lg rounded"
      />
    </div>
    <template v-if="inProcess">
      <slot></slot>
    </template>
  </div>
</template>
