<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import IconButton from '@/components/IconButton.vue';
import IconX from '@/components/icons/IconX.vue';
import IconSun from '@/components/icons/IconSun.vue';
import IconMoon from '@/components/icons/IconMoon.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useAppState } from '@/use/appState';

const { isDarkMode } = useAppState();

function setDarkMode() {
  isDarkMode.value = true;
}

function setLightMode() {
  isDarkMode.value = false;
}
</script>
<template>
  <div class="h-screen flex flex-col">
    <AppHeader title="Settings">
      <template #left>
        <IconButton @click="$emit('close')">
          <IconX />
        </IconButton>
      </template>
    </AppHeader>
    <!--Settings content-->
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <div class="divide-y border-b">
          <div class="flex divide-x">
            <BaseButton :active="!isDarkMode" @click="setLightMode"><IconSun /><span>Light</span></BaseButton>
            <BaseButton :active="isDarkMode" @click="setDarkMode"><IconMoon /><span>Dark</span></BaseButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
