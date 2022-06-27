<script setup lang="ts">
import { computed } from 'vue';

import DataDisplay from '@/components/DataDisplay.vue';
import IconButton from '@/components/IconButton.vue';
import IconMenu from '@/components/icons/IconMenu.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';
import IconRefreshCw from '@/components/icons/IconRefreshCw.vue';
import RecipeStep from '@/components/RecipeStep.vue';
import AppHeader from '@/components/AppHeader.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useAppState } from '@/use/appState';
import useStopwatch from '@/use/stopwatch';

const { running, totalDuration, toggleRunning, durationLabel, reset } = useStopwatch();
const hasStarted = computed(() => totalDuration.value > 0);
const showResetButton = computed(() => !running.value && totalDuration.value > 0);

const { activeRecipe } = useAppState();

function edit() {
  console.log('edit');
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <AppHeader :title="activeRecipe.name">
      <template #left>
        <!--Menu button-->
        <IconButton @click="$emit('menu-click')">
          <IconMenu />
        </IconButton>
      </template>
      <template #right>
        <!--Edit button-->
        <IconButton @click="edit">
          <IconEdit />
        </IconButton>
      </template>
    </AppHeader>
    <!--App content-->
    <main class="flex-grow relative">
      <div class="absolute inset-0 flex flex-col w-full sm:max-w-xl mx-auto">
        <!--Recipe content-->
        <div class="flex-grow flex-shrink overflow-y-auto border-b">
          <template v-if="!(running || hasStarted)">
            <!--Recipe metadata-->
            <div class="border-b text-sm divide-y">
              <!--Recipe notes-->
              <p v-if="activeRecipe.notes" class="text-sm text-gray-600 dark:text-gray-300 p-4">
                {{ activeRecipe.notes }}
              </p>
              <div class="flex divide-x">
                <DataDisplay class="flex-grow" label="Water Amt" :data="activeRecipe.waterAmount" />
                <DataDisplay class="flex-grow" label="Coffee Amt" :data="activeRecipe.coffeeAmount" />
                <DataDisplay class="flex-grow" label="Ratio" :data="activeRecipe.ratio" />
              </div>
              <div class="flex divide-x">
                <DataDisplay class="flex-grow" label="Water Temp" :data="activeRecipe.waterTemp" />
                <DataDisplay class="flex-grow" label="Grind" :data="activeRecipe.grind" />
                <DataDisplay class="flex-grow" label="Roast" :data="activeRecipe.roast" />
              </div>
            </div>
          </template>
          <!--Recipe steps-->
          <RecipeStep
            v-for="(step, i) in activeRecipe.steps"
            :key="i"
            :position="i + 1"
            :step="step"
            :running="running"
            :current="totalDuration"
          />
        </div>
        <!--Recipe buttons-->
        <div
          class="flex-shrink-0 border-t divide-y border-gray-700 sm:flex sm:mb-8 sm:mt-4 sm:border sm:divide-y-0 sm:divide-x"
        >
          <!--Reset button-->
          <BaseButton v-if="showResetButton" @click="reset"> <IconRefreshCw /><span>Reset</span> </BaseButton>
          <!--Play/pause button-->
          <BaseButton :active="running" @click="toggleRunning">
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
