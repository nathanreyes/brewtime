<script setup lang="ts"></script>
<template>
  <div class="h-screen flex flex-col">
    <AppHeader title="Welcome to GifMyCoffee!" hide-menu />
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <div class="px-4 sm:px-0">
          <p class="mt-4">GifMyCoffee is a free coffee timer app that helps people brew coffee with gifs.</p>
          <p class="my-4">That's it! Select a brew method to get started.</p>
        </div>
        <BrewGrid />
      </div>
    </main>
  </div>
</template>
