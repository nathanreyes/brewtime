<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  summary: string;
  summaryClass?: any;
  description?: string;
  progress?: number;
  selectable?: boolean;
}>();

const emit = defineEmits(['update:progress']);

const progressStyle = computed(() => {
  if (!props.progress) return {};
  return {
    width: `${props.progress * 100}%`,
  };
});

function progressClick(e: MouseEvent) {
  if (e.target == null) return;
  const target = e.target as HTMLElement;
  emit('update:progress', (e.offsetX - target.offsetLeft) / target.offsetWidth);
}
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
    <div v-if="progress && progress >= 0 && progress <= 1" class="absolute inset-0 mx-4 z-10">
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
