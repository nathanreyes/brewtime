<script setup lang="ts">
import { ref } from 'vue';
import brews from '@/content/brews.json';
import BrewItem from '@/components/menu/BrewGridItem.vue';
import DataDisplay from '../DataDisplay.vue';
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
    <div class="grid grid-flow-col auto-cols-max gap-4">
      <BrewItem v-for="brew in brews" :key="brew.name" :brew="brew" @click="updateBrewRecipe(brew.id)" />
    </div>
  </div>
  <div v-else class="flex space-x-4">
    <BrewItem :brew="selectedBrew" />
    <div>
      <DataDisplay label="Category" :data="selectedBrew.category" />
    </div>
  </div>
</template>
