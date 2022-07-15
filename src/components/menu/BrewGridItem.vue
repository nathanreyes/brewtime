<script setup lang="ts">
interface Brew {
  id: string;
  name: string;
  imgUrl?: string;
}
defineProps<{ brew: Brew }>();
</script>
<template>
  <RouterLink
    :to="`/${brew.id}`"
    class="flex flex-col items-stretch w-full h-44 border shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
    active-class="pointer-events-none opacity-50"
  >
    <div class="flex-grow">
      <img :src="brew.imgUrl" class="block w-full h-32 object-contain" />
    </div>
    <div class="flex justify-center items-center p-2">
      <p>
        {{ brew.name }}
      </p>
    </div>
  </RouterLink>
</template>
