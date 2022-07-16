<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDragState } from '@/use/dragState';

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

const progressRef = ref<HTMLElement | null>(null);
useDragState(
  progressRef,
  {
    fromX: 'start',
    triggerX: 1.5,
    triggerDuration: 50,
  },
  ({ offset }) => {
    const el = progressRef.value;
    if (el == null || offset == null) return;
    const percent = Math.max(0, (el.offsetLeft + offset.x) / el.offsetWidth);
    emit('update:modelValue', percent);
  }
);
</script>

<template>
  <div class="relative w-full h-full">
    <div class="bg-gray-200 dark:bg-gray-800 rounded-full shadow-inner" style="height: 5px" />
    <div class="absolute inset-0 bg-black dark:bg-white pointer-events-none rounded-full" :style="progressStyle" />
    <button class="absolute w-full -top-2 -bottom-2" ref="progressRef" />
  </div>
</template>
.
