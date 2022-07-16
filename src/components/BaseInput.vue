<script setup lang="ts">
defineProps<{
  modelValue: any;
}>();
const emit = defineEmits(['update:modelValue']);
function onInput(evt: Event) {
  emit('update:modelValue', (evt.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    :value="modelValue"
    class="block px-3 bg-white dark:bg-black border border-black dark:border-gray-500 text-black dark:text-white rounded"
    @input="onInput"
  />
</template>
