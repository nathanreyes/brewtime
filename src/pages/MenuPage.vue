<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import IconButton from '@/components/IconButton.vue';
import IconX from '@/components/icons/IconX.vue';
import IconArchive from '@/components/icons/IconArchive.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import BaseButtonGroup from '@/components/BaseButtonGroup.vue';
import LibraryMenu from '@/components/menu/LibraryMenu.vue';
import SettingsMenu from '@/components/menu/SettingsMenu.vue';
import { useAppState } from '@/use/appState';

const { menuMode } = useAppState();

const headerButtons = [
  { label: 'Library', icon: IconArchive, value: 'library' },
  { label: 'Settings', icon: IconSettings, value: 'settings' },
];
</script>
<template>
  <div class="h-screen flex flex-col">
    <AppHeader>
      <template #left>
        <IconButton @click="$emit('close')">
          <IconX />
        </IconButton>
      </template>
      <template #title>
        <div class="pb-4">
          <BaseButtonGroup v-model="menuMode" :buttons="headerButtons" />
        </div>
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
