<script setup lang="ts">
import { ref } from 'vue';
import brews from '@/content/brews.json';
import { useAppState } from '@/use/appState';

const { brewer, recipeLibrary, menuVisible } = useAppState();
const selectedBrew = ref<any>(null);

function updateBrewRecipe(brewId: string) {
  const recipe = recipeLibrary.find((r) => r.brewId === brewId);
  if (recipe) {
    brewer.recipe.value = recipe;
    menuVisible.value = false;
  }
}
</script>
<template>
  <div v-if="!selectedBrew">
    <div class="grid grid-flow-col auto-cols-max gap-4 m-4 mt-2 sm:m-0">
      <BrewGridItem v-for="brew in brews" :key="brew.name" :brew="brew" @click="updateBrewRecipe(brew.id)" />
    </div>
  </div>
  <div v-else class="flex space-x-4">
    <BrewGridItem :brew="selectedBrew" />
    <div>
      <DataDisplay label="Category" :data="selectedBrew.category" />
    </div>
  </div>
</template>
