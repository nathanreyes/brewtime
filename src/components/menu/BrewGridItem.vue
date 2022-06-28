<script setup lang="ts">
import { computed } from 'vue';
interface Brew {
  name: string;
  imgUrl?: string;
}
const props = defineProps<{ brew: Brew }>();

const imageStyle = computed(() => {
  if (!props.brew.imgUrl) return undefined;
  return {
    backgroundImage: `url('${new URL(props.brew.imgUrl, import.meta.url).href}')`,
  };
});
</script>
<template>
  <div class="flex flex-col items-stretch w-44 h-44 border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
    <div class="flex-grow bg-contain bg-no-repeat bg-center" :style="imageStyle" />
    <div class="flex justify-center items-center p-2">
      <p>
        {{ brew.name }}
      </p>
    </div>
  </div>
</template>
