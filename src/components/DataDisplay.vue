<script setup lang="ts">
defineProps<{ label: string; data: string }>();
</script>

<template>
  <div class="flex flex-col items-center space-y-1 w-24 my-4">
    <p class="font-semibold">{{ data }}</p>
    <p class="text-xs tracking-wide text-gray-500 dark:text-gray-400 uppercase">{{ label }}</p>
  </div>
</template>
