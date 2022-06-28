<script setup lang="ts">
defineProps<{ label: string; data: string }>();
</script>

<template>
  <div class="flex justify-between items-baseline py-2 px-4">
    <p class="font-semibold text-xs tracking-wide text-gray-500 dark:text-gray-400 uppercase mr-4">{{ label }}</p>
    <p class="capitalize">{{ data }}</p>
  </div>
</template>
