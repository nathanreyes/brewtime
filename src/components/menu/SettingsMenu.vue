<script setup lang="ts">
import BaseButtonGroup from '@/components/BaseButtonGroup.vue';
import IconSun from '@/components/icons/IconSun.vue';
import IconMoon from '@/components/icons/IconMoon.vue';
import IconCommand from '@/components/icons/IconCommand.vue';
import { useAppState } from '@/use/appState';

const { displayMode } = useAppState();
const displayModeButtons = [
  { label: 'Light', value: 'light', icon: IconSun },
  { label: 'Dark', value: 'dark', icon: IconMoon },
  { label: 'Auto', value: 'auto', icon: IconCommand },
];
</script>

<template>
  <div>
    <!--Display mode-->
    <p class="text-lg uppercase">Display Mode</p>
    <BaseButtonGroup class="mt-2" v-model="displayMode" :buttons="displayModeButtons" />
  </div>
</template>
