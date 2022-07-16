<script setup lang="ts">
import { computed, watch } from 'vue';
import { useAppState } from '@/use/appState';
import { useProtected } from '@/use/protected';
import { roundTenth } from '@/util/math';
import type { Brew } from '@/use/brewer';
import type { Recipe, RecipeField } from '@/use/recipe';

interface Option<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

const props = defineProps<{ recipe: Recipe; brew: Brew; editField: RecipeField }>();
defineEmits(['close']);

const { isFahrenheit, waterAmountUpdate, coffeeAmountUpdate, ratioUpdate } = useAppState();
const { protect } = useProtected();

function updateWaterAmount() {
  const { recipe } = props;
  recipe.waterAmount = recipe.coffeeAmount * recipe.ratio;
}

function updateCoffeeAmount() {
  const { recipe } = props;
  recipe.coffeeAmount = recipe.waterAmount / recipe.ratio;
}

function updateRatio() {
  const { recipe } = props;
  recipe.ratio = recipe.waterAmount / recipe.coffeeAmount;
}

watch(
  () => props.recipe.waterAmount,
  () => {
    protect(() => {
      if (waterAmountUpdate.value === 'coffee') updateCoffeeAmount();
      else updateRatio();
    });
  }
);

watch(
  () => props.recipe.coffeeAmount,
  () => {
    protect(() => {
      if (coffeeAmountUpdate.value === 'water') updateWaterAmount();
      else updateRatio();
    });
  }
);

watch(
  () => props.recipe.ratio,
  () => {
    protect(() => {
      if (ratioUpdate.value === 'water') updateWaterAmount();
      else updateCoffeeAmount();
    });
  }
);

function insertOption(value: any, options: Option<any>[]) {
  const idx = options.findIndex((opt) => value <= opt.value);
  const label = typeof value === 'string' ? value : roundTenth(value).toString();
  const option = { label, value, disabled: true };
  if (idx >= 0) {
    if (options[idx].value.toString() !== value.toString()) {
      options.splice(idx, 0, option);
    }
  } else {
    options.push(option);
  }
  return options;
}

// Grinds
const grindOptions = computed(() => {
  const options: Option<string>[] = ['Fine', 'Med Fine', 'Medium', 'Med Coarse', 'Coarse'].map((g) => ({
    label: g,
    value: g,
  }));

  return insertOption(props.recipe.grind, options);
});

// Roasts
const roastOptions = computed(() => {
  const options = ['Light', 'Medium', 'Dark', 'Extra Dark'].map((r) => ({
    label: r,
    value: r,
  }));
  return insertOption(props.recipe.roast, options);
});
</script>

<template>
  <div class="relative font-medium text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-b">
    <!--Water amount-->
    <template v-if="editField === 'waterAmount'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Water Amount:</label>
        <div class="flex items-baseline space-x-2">
          <BaseInput v-model.number="recipe.waterAmount" type="number" class="w-24" v-select v-focus />
          <label>g</label>
        </div>
      </div>
      <!--Water amount update setting-->
      <div class="flex justify-center items-center space-x-2 px-4 pb-4">
        <span>Adjust</span>
        <input type="radio" id="coffee" value="coffee" v-model="waterAmountUpdate" />
        <label for="coffee" :class="{ 'opacity-50': waterAmountUpdate !== 'coffee' }">coffee</label>
        <input type="radio" id="ratio" value="ratio" class="" v-model="waterAmountUpdate" />
        <label for="ratio" :class="{ 'opacity-50': waterAmountUpdate !== 'ratio' }">ratio</label>
        <span>when updated</span>
      </div>
    </template>
    <!--Water temp-->
    <template v-else-if="editField === 'waterTemp'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Water Temp:</label>
        <div class="flex items-baseline space-x-2">
          <BaseInput v-model.number="recipe.waterTemp" type="number" class="w-24" v-select v-focus />
          <label>&#176;F</label>
        </div>
      </div>
    </template>
    <!--Coffee amount-->
    <template v-else-if="editField === 'coffeeAmount'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Coffee Amount:</label>
        <div class="flex items-baseline space-x-2">
          <BaseInput v-model.number="recipe.coffeeAmount" type="number" class="w-24" v-select v-focus />
          <label>g</label>
        </div>
      </div>
      <!--Coffee amount update setting-->
      <div class="flex justify-center items-center space-x-2 px-4 pb-4">
        <span>Adjust</span>
        <input type="radio" id="water" value="water" v-model="coffeeAmountUpdate" />
        <label for="water" :class="{ 'opacity-50': coffeeAmountUpdate !== 'water' }">water</label>
        <input type="radio" id="ratio" value="ratio" class="" v-model="coffeeAmountUpdate" />
        <label for="ratio" :class="{ 'opacity-50': coffeeAmountUpdate !== 'ratio' }">ratio</label>
        <span>when updated</span>
      </div>
    </template>
    <!--Grind-->
    <template v-else-if="editField === 'grind'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Grind:</label>
        <BaseSelect v-model="recipe.grind" :options="grindOptions" />
      </div>
    </template>
    <!--Ratio-->
    <template v-else-if="editField === 'ratio'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Ratio:</label>
        <div class="flex items-baseline space-x-2">
          <BaseInput v-model.number="recipe.ratio" type="number" step="0.1" min="0" class="w-24" v-select v-focus />
          <label>:1</label>
        </div>
      </div>
      <!--Ratio update setting-->
      <div class="flex justify-center items-center space-x-2 px-4 pb-4">
        <span>Adjust</span>
        <input type="radio" id="water" value="water" v-model="ratioUpdate" />
        <label for="water" :class="{ 'opacity-50': ratioUpdate !== 'water' }">water</label>
        <input type="radio" id="coffee" value="coffee" class="" v-model="ratioUpdate" />
        <label for="coffee" :class="{ 'opacity-50': ratioUpdate !== 'coffee' }">coffee</label>
        <span>when updated</span>
      </div>
    </template>
    <!--Roast-->
    <template v-else-if="editField === 'roast'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Roast:</label>
        <BaseSelect v-model="recipe.roast" :options="roastOptions" />
      </div>
    </template>
    <!--Close button-->
    <button
      class="absolute top-1 right-1 p-1 text-gray-400 dark:text-gray-400 hover:opacity-50"
      @click="$emit('close')"
    >
      <IconX class="w-5 h-5" />
    </button>
  </div>
</template>
