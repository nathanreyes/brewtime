<script setup lang="ts">
defineProps<{
  name: string;
  url: string;
  imgUrl: string;
}>();
</script>

<template>
  <a :href="url" class="flex flex-col border rounded p-2 w-24 space-y-4 hover:border-gray-400" target="_blank">
    <span class="text-xs font-medium">{{ name }}</span>
    <img border="0" :src="imgUrl" class="inline-block" />
  </a>
</template>
