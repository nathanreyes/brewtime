<script setup lang="ts">
import IconCoffee from '../components/icons/IconCoffee.vue';
import PageTitle from './PageTitle.vue';

defineProps<{
  title?: string;
}>();
</script>
<template>
  <header class="flex-shrink-0 border-b">
    <div class="w-full sm:max-w-xl mx-auto">
      <div class="flex items-center h-16 px-2 sm:px-0 mx-auto">
        <!--Left slot-->
        <slot name="left">
          <div class="w-12"></div>
        </slot>
        <!--App icon/title-->
        <div class="flex-grow flex justify-center items-center space-x-3">
          <IconCoffee class="text-gray-400 mb-1 dark:text-gray-500" />
          <h2 class="font-bold text-sm tracking-widest text-gray-600 dark:text-gray-400 text-center uppercase">
            Brewtime
          </h2>
        </div>
        <!--Right slot-->
        <slot name="right">
          <div class="w-12"></div>
        </slot>
      </div>
      <PageTitle v-if="title">{{ title }}</PageTitle>
    </div>
  </header>
</template>
