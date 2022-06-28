<script setup lang="ts">
import { ref } from 'vue';
import ListItem from '../ListItem.vue';
import BrewGrid from './BrewGrid.vue';

const mode = ref('brew');
</script>

<template>
  <div v-if="!mode" class="border divider-y">
    <ListItem summary="By Brew" selectable @click="mode = 'brew'" />
  </div>
  <BrewGrid v-if="mode === 'brew'" />
</template>
