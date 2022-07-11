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
const { offset } = useDragState(progressRef, {
  fromX: 'start',
  triggerX: 1.5,
  triggerDuration: 50,
});
watch(
  () => offset.value,
  (val) => {
    const el = progressRef.value;
    if (val == null || el == null) return;
    const percent = Math.max(0, (el.offsetLeft + val.x) / el.offsetWidth);
    emit('update:modelValue', percent);
  }
);
</script>

<template>
  <div class="relative w-full h-full">
    <div class="border-b-4 border-gray-200 dark:border-gray-800" />
    <div
      class="absolute inset-0 border-b-4 border-black dark:border-white pointer-events-none"
      :style="progressStyle"
    />
    <button class="absolute w-full -top-2 -bottom-2" ref="progressRef" />
  </div>
</template>
.
