<script setup lang="ts">
defineProps<{
  modelValue: any;
}>();
defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :value="modelValue"
    class="block px-3 bg-white dark:bg-black border border-black dark:border-gray-500 text-black dark:text-white rounded"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
