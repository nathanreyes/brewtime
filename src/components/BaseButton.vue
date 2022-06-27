<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>
<template>
  <button
    class="flex justify-center items-center w-full h-16 space-x-4 border-gray-700"
    :class="[
      active
        ? 'bg-black hover:bg-gray-900 text-white dark:bg-gray-600 dark:hover:bg-gray-700'
        : 'hover:bg-gray-50 dark:hover:bg-gray-700',
    ]"
  >
    <slot />
  </button>
</template>
