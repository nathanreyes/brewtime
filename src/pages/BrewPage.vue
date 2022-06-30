<script setup lang="ts">
import { computed } from 'vue';
import { useAppState } from '@/use/appState';

const { brewer, displayMode } = useAppState();
const { recipe, brew, hasStarted, hasCompleted, running, duration, toggleRunning, durationLabel, reset } = brewer;
const showReset = computed(() => !running.value && (duration.value > 0 || hasCompleted.value));
const showPlayPause = computed(() => !hasCompleted.value);

function updateCurrent(current: number) {
  console.log('update current', current);
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <AppHeader :title="recipe.name">
      <template #left>
        <!--Menu button-->
        <IconButton @click="$emit('menu-click')">
          <IconMenu />
        </IconButton>
      </template>
      <template #right>
        <!--Light/dark mode button-->
        <IconButton @click="displayMode = displayMode === 'light' ? 'dark' : 'light'">
          <IconSun v-if="displayMode === 'dark'" />
          <IconMoon v-else />
        </IconButton>
      </template>
    </AppHeader>
    <!--App content-->
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <!--Recipe content-->
        <div class="flex-grow flex-shrink overflow-y-auto px-4 sm:-mx-4">
          <template v-if="!(running || hasStarted)">
            <!--Recipe image/notes-->
            <div class="flex items-start mb-4 mt-2 space-x-4">
              <img v-if="brew" :src="brew.imgUrl" class="flex-shrink-0 flex-grow-0 h-20" :img-url="brew.imgUrl" />
              <p v-if="recipe.notes" class="flex-grow text-sm text-gray-600 dark:text-gray-300">
                {{ recipe.notes }}
              </p>
            </div>
            <!--Recipe metadata-->
            <div class="border-y text-sm">
              <div class="sm:hidden divide-y">
                <div class="flex divide-x">
                  <DataDisplay class="w-1/2" label="Water Amt" :data="recipe.waterAmount" />
                  <DataDisplay class="w-1/2" label="Water Temp" :data="recipe.waterTemp" />
                </div>
                <div class="flex divide-x">
                  <DataDisplay class="w-1/2" label="Coffee Amt" :data="recipe.coffeeAmount" />
                  <DataDisplay class="w-1/2" label="Grind" :data="recipe.grind" />
                </div>
                <div class="flex divide-x">
                  <DataDisplay class="w-1/2" label="Ratio" :data="recipe.ratio" />
                  <DataDisplay class="w-1/2" label="Roast" :data="recipe.roast" />
                </div>
              </div>
              <div class="hidden sm:block divide-y">
                <div class="flex divide-x">
                  <DataDisplay class="w-1/3" label="Water Amt" :data="recipe.waterAmount" />
                  <DataDisplay class="w-1/3" label="Coffee Amt" :data="recipe.coffeeAmount" />
                  <DataDisplay class="w-1/3" label="Ratio" :data="recipe.ratio" />
                </div>
                <div class="flex divide-x">
                  <DataDisplay class="w-1/3" label="Water Temp" :data="recipe.waterTemp" />
                  <DataDisplay class="w-1/3" label="Grind" :data="recipe.grind" />
                  <DataDisplay class="w-1/3" label="Roast" :data="recipe.roast" />
                </div>
              </div>
            </div>
          </template>
          <div>
            <!--Recipe steps-->
            <RecipeStepListItem
              v-for="(step, i) in recipe.steps"
              :key="i"
              :step="step"
              :current="duration"
              :running="running"
              @update:current="updateCurrent"
            />
          </div>
        </div>
        <!--Recipe buttons-->
        <div
          class="flex-shrink-0 mt-4 mb-4 sm:mb-6 mx-4 sm:mx-0 border border-black dark:border-white divide-y divide-black dark:divide-white"
        >
          <!--Reset button-->
          <BaseButton v-if="showReset" is-lg @click="reset"> <IconRefreshCw /><span>Reset</span> </BaseButton>
          <!--Play/pause button-->
          <BaseButton v-if="showPlayPause" is-lg :active="running" @click="toggleRunning">
            <template v-if="running"> <IconPause /> </template>
            <template v-else>
              <IconPlay />
            </template>
            <p class="text-lg" :class="[running ? 'text-white' : 'text-gray-900 dark:text-gray-200']">
              {{ durationLabel }}
            </p>
          </BaseButton>
        </div>
      </div>
    </main>
  </div>
</template>
