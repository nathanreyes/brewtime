<script setup lang="ts">
import { useAppState } from './use/appState';

const { menuVisible } = useAppState();
</script>

<template>
  <BrewPage v-if="menuVisible" />
  <RouterView v-else />
</template>
