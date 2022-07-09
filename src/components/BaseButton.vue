<script setup lang="ts">
defineProps<{
  active?: boolean;
  bordered?: boolean;
  isLg?: boolean;
}>();
</script>
<template>
  <button
    class="flex justify-center items-center w-full space-x-3 rounded"
    :class="[
      { 'border border-black dark:border-white': bordered },
      active
        ? 'bg-black hover:bg-gray-900 text-white dark:bg-gray-800 dark:hover:bg-gray-900'
        : 'hover:bg-gray-50 dark:hover:bg-gray-700',
      isLg ? 'h-12 text-lg' : 'h-10',
    ]"
  >
    <slot />
  </button>
</template>
