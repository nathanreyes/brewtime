<script setup lang="ts">
const props = defineProps<{
  id: string;
  label: string;
  data: string | number;
  dataLabel: string;
  modelValue: string | null;
}>();
const emit = defineEmits(['update:modelValue']);

function toggleValue() {
  if (props.id === props.modelValue) {
    emit('update:modelValue', '');
  } else {
    emit('update:modelValue', props.id);
  }
}
</script>

<template>
  <div
    class="flex justify-between items-baseline py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
    :class="{ 'bg-gray-100 dark:bg-gray-700': id && id === modelValue }"
    @click="toggleValue"
  >
    <p class="font-semibold text-xs tracking-wide text-gray-500 dark:text-gray-400 uppercase mr-4">{{ label }}</p>
    <p class="capitalize">{{ dataLabel }}</p>
  </div>
</template>
