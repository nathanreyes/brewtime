<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>
<template>
  <header class="flex-shrink-0">
    <div class="w-full sm:max-w-xl mx-auto pb-2">
      <div class="flex items-center h-16 px-2 sm:px-0 sm:-mx-2 mx-auto">
        <!--Left slot-->
        <slot name="left">
          <div class="w-12"></div>
        </slot>
        <!--App icon/title-->
        <div class="flex-grow flex justify-center items-center space-x-3">
          <IconCoffee class="text-gray-400 mb-1 dark:text-gray-500" />
          <h2 class="font-bold text-sm tracking-widest text-gray-600 dark:text-gray-400 text-center uppercase">
            Gif-My-Coffee
          </h2>
        </div>
        <!--Right slot-->
        <slot name="right">
          <div class="w-12"></div>
        </slot>
      </div>
      <slot name="title">
        <PageTitle v-if="title">{{ title }}</PageTitle>
      </slot>
    </div>
  </header>
</template>
