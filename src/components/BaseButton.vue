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
        ? 'bg-black hover:bg-gray-900 text-white dark:bg-gray-600 dark:hover:bg-gray-700'
        : 'hover:bg-gray-50 dark:hover:bg-gray-700',
      isLg ? 'h-16' : 'h-10',
    ]"
  >
    <slot />
  </button>
</template>
