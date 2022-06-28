<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import IconButton from '@/components/IconButton.vue';
import IconX from '@/components/icons/IconX.vue';
import LibraryMenu from '@/components/menu/LibraryMenu.vue';
import SettingsMenu from '@/components/menu/SettingsMenu.vue';
import { useAppState } from '@/use/appState';

const { menuMode } = useAppState();
</script>
<template>
  <div class="h-screen flex flex-col">
    <AppHeader title="Brew Method">
      <template #left>
        <IconButton @click="$emit('close')">
          <IconX />
        </IconButton>
      </template>
    </AppHeader>
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <template v-if="menuMode === 'favorites'"> </template>
        <LibraryMenu v-else-if="menuMode === 'library'" />
        <SettingsMenu v-if="menuMode === 'settings'" />
      </div>
    </main>
  </div>
</template>
