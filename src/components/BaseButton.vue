<script setup lang="ts">
defineProps<{
  active?: boolean;
  isLg?: boolean;
}>();
</script>
<template>
  <button
    class="flex justify-center items-center w-full space-x-3"
    :class="[
      active
        ? 'bg-black hover:bg-gray-900 text-white dark:bg-gray-800 dark:hover:bg-gray-900'
        : 'hover:bg-gray-50 dark:hover:bg-gray-700',
      isLg ? 'h-10 sm:h-12 text-lg' : 'h-8 sm:h-10',
    ]"
  >
    <slot />
  </button>
</template>
