<script setup lang="ts">
import { useAppState } from '@/use/appState';

defineProps<{
  title?: string;
  hideMenu?: boolean;
  hideDisplayMode?: boolean;
}>();

const { displayMode, menuVisible } = useAppState();

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}
</script>
<template>
  <header class="flex-shrink-0 z-10">
    <div class="w-full sm:max-w-xl mx-auto pb-2">
      <div class="flex items-center h-16 px-2 sm:px-0 sm:-mx-2 mx-auto">
        <!--Left slot-->
        <slot name="left">
          <!--Menu button-->
          <template v-if="!hideMenu">
            <IconButton v-if="menuVisible" @click="toggleMenu">
              <IconX />
            </IconButton>
            <IconButton v-else @click="toggleMenu">
              <IconMenu />
            </IconButton>
          </template>
          <div v-else class="w-12"></div>
        </slot>
        <!--App icon/title-->
        <RouterLink to="/" class="flex-grow flex justify-center items-center space-x-3">
          <IconCoffee class="text-gray-400 mb-1 dark:text-gray-500" />
          <h2 class="font-semibold text-sm tracking-widest text-gray-400 dark:text-gray-500 text-center uppercase">
            Gif-My-Coffee
          </h2>
        </RouterLink>
        <!--Right slot-->
        <slot name="right">
          <!--Light/dark mode button-->
          <IconButton v-if="!hideDisplayMode" @click="displayMode = displayMode === 'light' ? 'dark' : 'light'">
            <IconSun v-if="displayMode === 'dark'" />
            <IconMoon v-else />
          </IconButton>
          <div v-else class="w-12"></div>
        </slot>
      </div>
      <slot name="title">
        <PageTitle v-if="title">{{ title }}</PageTitle>
      </slot>
    </div>
  </header>
</template>
