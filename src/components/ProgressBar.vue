<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits(['update:modelValue']);

const progressStyle = computed(() => {
  if (!props.modelValue) return {};
  return {
    width: `${props.modelValue * 100}%`,
  };
});

function progressClick(e: MouseEvent) {
  if (e.target == null) return;
  const target = e.target as HTMLElement;
  const progress = (e.offsetX - target.offsetLeft) / target.offsetWidth;
  emit('update:modelValue', progress);
}
</script>

<template>
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
</template>
.
