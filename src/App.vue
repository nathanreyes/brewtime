<script setup lang="ts">
import { useAppState } from './use/appState';

const { menuVisible } = useAppState();
</script>

<template>
  <MenuPage v-if="menuVisible" @close="menuVisible = false" />
  <BrewPage v-else @menu-click="menuVisible = true" />
</template>
