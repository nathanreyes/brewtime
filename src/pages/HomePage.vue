<script setup lang="ts"></script>
<template>
  <div class="h-screen flex flex-col">
    <AppHeader title="Welcome to GifMyCoffee!" hide-menu />
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <BrewGrid />
      </div>
    </main>
  </div>
</template>
