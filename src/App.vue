<script setup lang="ts">
import { ref } from 'vue';

const menuVisible = ref(false);
</script>

<template>
  <MenuPage v-if="menuVisible" @close="menuVisible = false" />
  <BrewPage v-else @menu-click="menuVisible = true" />
</template>
