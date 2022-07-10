<script setup lang="ts">
import { useAppState } from './use/appState';

const { menuVisible } = useAppState();
</script>

<template>
  <BrewPage v-if="menuVisible" />
  <router-view v-else />
</template>
