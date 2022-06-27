<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  summary: string;
  summaryClass?: any;
  description?: string;
  progress?: number;
}>();

const progressStyle = computed(() => {
  if (!props.progress) return {};
  return {
    width: `${props.progress * 100}%`,
  };
});
</script>
<template>
  <div class="relative w-full py-4 px-4">
    <div class="flex justify-between items-start">
      <div class="flex-grow">
        <h3 class="text-lg" :class="summaryClass">{{ summary }}</h3>
      </div>
      <slot name="right" />
    </div>
    <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ description }}</p>
    <slot name="details"> </slot>
    <div
      v-if="progress && progress < 1"
      class="absolute h-full left-0 top-0 border-b-4 border-black dark:border-white z-10"
      :style="progressStyle"
    ></div>
  </div>
</template>
