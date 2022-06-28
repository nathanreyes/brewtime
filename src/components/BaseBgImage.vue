<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ imgUrl: string }>();

const imageStyle = computed(() => {
  if (!props.imgUrl) return undefined;
  return {
    backgroundImage: `url('${new URL(props.imgUrl, import.meta.url).href}')`,
  };
});
</script>
<template>
  <div class="flex-grow bg-contain bg-no-repeat bg-center" :style="imageStyle" />
</template>
