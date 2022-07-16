<script setup lang="ts">
import { ref } from 'vue';
import brews from '@/content/brews.json';

const selectedBrew = ref<any>(null);
</script>
<template>
  <div v-if="!selectedBrew">
    <div class="grid grid-cols-2 sm:grid-cols-3 auto-cols-fr gap-4 m-4 mt-2 sm:m-0">
      <BrewGridItem v-for="brew in brews" :key="brew.name" :brew="brew" />
    </div>
  </div>
  <div v-else class="flex space-x-4">
    <BrewGridItem :brew="selectedBrew" />
    <div>
      <DataDisplay label="Category" :data="selectedBrew.category" />
    </div>
  </div>
</template>
