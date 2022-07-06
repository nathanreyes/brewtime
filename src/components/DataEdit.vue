<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAppState } from '@/use/appState';
import { useProtected } from '@/use/protected';
import type { Brew } from '@/use/brewer';
import type { Recipe, RecipeField } from '@/use/recipe';

const props = defineProps<{ recipe: Recipe; brew: Brew; editField: RecipeField }>();
defineEmits(['close']);

const { isFahrenheit, waterAmountUpdate, coffeeAmountUpdate, ratioUpdate } = useAppState();
const { protect } = useProtected();

const waterAmountRange = {
  min: 150,
  max: 450,
  step: 5,
};

const coffeeAmountRange = {
  min: 5,
  max: 100,
  step: 1,
};

const fahrenheightRange = {
  min: 175,
  max: 220,
  step: 1,
};

const celciusRange = {
  min: 79,
  max: 104,
  step: 1,
};

const selectClass = ref(
  'block h-10 appearance-none bg-white dark:bg-black border-black dark:border-gray-500 text-black dark:text-white'
);

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

// Water amounts
const waterAmountOptions = computed(() => {
  const options = [];
  const { min, max, step } = waterAmountRange;
  for (let i = min; i <= max; i += step) {
    options.push({ label: i.toString(), value: i });
  }
  return options;
});

// Water temps
const waterTempOptions = computed(() => {
  const options = [];
  const { min, max, step } = isFahrenheit.value ? fahrenheightRange : celciusRange;
  for (let i = min; i <= max; i += step) {
    options.push({ label: i.toString(), value: i });
  }
  return options;
});

// Coffee amounts
const coffeeAmountOptions = computed(() => {
  const options = [];
  const { min, max, step } = coffeeAmountRange;
  for (let i = min; i <= max; i += step) {
    options.push({ label: i.toString(), value: i });
  }
  return options;
});

// Coffee grinds
const coffeeGrindOptions = computed(() => {
  return ['Fine', 'Med Fine', 'Medium', 'Med Coarse', 'Coarse'].map((g) => ({
    label: g,
    value: g,
  }));
});

// Ratios
const ratioOptions = computed(() => {
  const options = [];
  for (let i = 1; i <= 40; i += 1) {
    options.push({ label: i.toString(), value: i });
  }
  return options;
});
</script>

<template>
  <div class="relative font-medium text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-b">
    <!--Water amount-->
    <template v-if="editField === 'waterAmount'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Water Amount:</label>
        <div class="flex items-baseline space-x-2">
          <select :class="selectClass" v-model="recipe.waterAmount">
            <option v-for="option in waterAmountOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
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
          <select :class="selectClass" v-model="recipe.waterTemp">
            <option v-for="option in waterTempOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <label>&#176;F</label>
        </div>
      </div>
    </template>
    <!--Coffee amount-->
    <template v-else-if="editField === 'coffeeAmount'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Coffee Amount:</label>
        <div class="flex items-baseline space-x-2">
          <select :class="selectClass" v-model="recipe.coffeeAmount">
            <option v-for="option in coffeeAmountOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
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
    <!--Coffee grind-->
    <template v-else-if="editField === 'coffeeGrind'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Grind:</label>
        <select :class="selectClass" v-model="recipe.coffeeGrind">
          <option v-for="option in coffeeGrindOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </template>
    <!--Ratio-->
    <template v-else-if="editField === 'ratio'">
      <div class="flex justify-center items-baseline space-x-4 px-4 sm:px-0 py-4">
        <label>Ratio:</label>
        <div class="flex items-baseline space-x-2">
          <select :class="selectClass" v-model="recipe.ratio">
            <option v-for="option in ratioOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
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
        <label>{{ recipe.roast }}</label>
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
