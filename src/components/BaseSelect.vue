<script setup lang="ts">
interface Option {
  value: any;
  label: string;
  disabled?: boolean;
}
defineProps<{
  options: Option[];
  modelValue: any;
}>();
const emit = defineEmits(['update:modelValue']);
const selectClass =
  'block appearance-none bg-white dark:bg-black border-black dark:border-gray-500 text-black dark:text-white rounded';

function onChange(evt: Event) {
  emit('update:modelValue', (evt.target as HTMLSelectElement).value);
}
</script>

<template>
  <select :class="selectClass" :value="modelValue" @change="onChange">
    <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">
      {{ option.label }}
    </option>
  </select>
</template>
