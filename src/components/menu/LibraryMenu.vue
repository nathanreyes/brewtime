<script setup lang="ts">
import { ref } from 'vue';
const mode = ref('brew');
</script>

<template>
  <div v-if="!mode" class="border divider-y">
    <ListItem summary="By Brew" selectable @click="mode = 'brew'" />
  </div>
  <BrewGrid v-if="mode === 'brew'" />
</template>
