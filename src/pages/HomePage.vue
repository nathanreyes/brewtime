<script setup lang="ts"></script>
<template>
  <div class="h-screen flex flex-col">
    <AppHeader title="Welcome to GifMyCoffee!" hide-menu />
    <main class="flex-grow relative text-gray-700 dark:text-gray-300 text-sm">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <div class="px-4 sm:px-0">
          <p class="mt-4">GifMyCoffee is a free coffee timer app that helps people brew coffee with gifs. That's it!</p>
          <p class="my-4 font-bold text-base text-black dark:text-white text-center">
            Select a brew method to get started.
          </p>
        </div>
        <BrewGrid />
      </div>
    </main>
    <footer class="flex-shrink-0 flex justify-center items-center h-10">
      <div class="text-sm text-gray-300 dark:text-gray-600">&copy; Nathan Reyes 2022</div>
    </footer>
  </div>
</template>
