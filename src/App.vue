<script setup lang="ts">
import { ref } from 'vue';

import BrewPage from './pages/BrewPage.vue';
import SettingsPage from './pages/SettingsPage.vue';

const settingsVisible = ref(false);

function showSettings() {
  settingsVisible.value = true;
}

function closeSettings() {
  settingsVisible.value = false;
}
</script>

<template>
  <SettingsPage v-if="settingsVisible" @close="closeSettings" />
  <BrewPage v-else @menu-click="showSettings" />
</template>
