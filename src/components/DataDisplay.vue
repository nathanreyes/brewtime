<script setup lang="ts">
defineProps<{ label: string; data: string }>();
</script>

<template>
  <div class="flex justify-between items-baseline space-y-1 w-24 py-2 px-4">
    <p class="text-xs tracking-wide text-gray-500 dark:text-gray-400 uppercase">{{ label }}</p>
    <p class="font-semibold">{{ data }}</p>
  </div>
</template>
