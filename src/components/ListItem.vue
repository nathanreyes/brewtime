<script setup lang="ts">
import { computed } from 'vue';
import IconChevronRight from './icons/IconChevronRight.vue';

const props = defineProps<{
  summary: string;
  summaryClass?: any;
  description?: string;
  progress?: number;
  selectable?: boolean;
}>();

const progressStyle = computed(() => {
  if (!props.progress) return {};
  return {
    width: `${props.progress * 100}%`,
  };
});
</script>
<template>
  <div class="relative w-full py-4 px-4" :class="{ 'cursor-pointer hover:bg-gray-100': selectable }">
    <div class="flex justify-between items-start">
      <div class="flex-grow">
        <slot>
          <h3 class="text-lg">{{ summary }}</h3>
        </slot>
        <slot name="description">
          <p v-if="description" class="text-sm text-gray-600 dark:text-gray-300 mt-2">{{ description }}</p>
        </slot>
      </div>
      <slot name="right">
        <IconChevronRight v-if="selectable" />
      </slot>
    </div>
    <slot name="details" />
    <div
      v-if="progress && progress < 1"
      class="absolute h-full left-0 top-0 border-b-4 border-black dark:border-white mx-4 z-10"
      :style="progressStyle"
    ></div>
  </div>
</template>
