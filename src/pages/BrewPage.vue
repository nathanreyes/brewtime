<script setup lang="ts"></script>
<template>
  <div class="h-screen flex flex-col">
    <AppHeader title="Select Brew Method" />
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <BrewGrid class="mt-2" />
      </div>
    </main>
  </div>
</template>
