import { ref, watchEffect, computed, watch } from 'vue';
import type { Ref } from 'vue';
import recipeLibrary from '@/content/recipeLibrary';
import { useDisplayMode } from '@/use/displayMode';
import { useBrewer } from '@/use/brewer';
import pick from '@/util/pick';
import type { DisplayMode } from '@/use/displayMode';
import type { Recipe } from '@/use/recipe';

type MenuMode = 'favorites' | 'library' | 'settings';
type TemperatureUnit = 'c' | 'f';

const displayMode = ref<DisplayMode>('light');
const temperatureUnit = ref<TemperatureUnit>('f');
const isFahrenheit = computed(() => temperatureUnit.value === 'f');
const isCelcius = computed(() => temperatureUnit.value === 'c');
const menuVisible = ref(false);
const menuMode = ref<MenuMode>('library');
const waterAmountUpdate = ref<'coffee' | 'ratio'>('coffee');
const coffeeAmountUpdate = ref<'water' | 'ratio'>('ratio');
const ratioUpdate = ref<'water' | 'coffee'>('coffee');
const savedRecipes = ref<Record<string, Partial<Recipe>>>({});
const activeRecipe = ref(recipeLibrary[0]);

useDisplayMode(displayMode);

const state = JSON.parse(localStorage.getItem('state') || '{}');
if (state.hasOwnProperty('displayMode')) displayMode.value = state.displayMode;
if (state.hasOwnProperty('temperatureUnit')) temperatureUnit.value = state.temperatureUnit;
if (state.hasOwnProperty('menuMode')) menuMode.value = state.menuMode;
if (state.hasOwnProperty('waterAmountUpdate')) waterAmountUpdate.value = state.waterAmountUpdate;
if (state.hasOwnProperty('coffeeAmountUpdate')) coffeeAmountUpdate.value = state.coffeeAmountUpdate;
if (state.hasOwnProperty('ratioUpdate')) ratioUpdate.value = state.ratioUpdate;
if (state.hasOwnProperty('recipes')) savedRecipes.value = state.recipes;
if (state.hasOwnProperty('activeRecipeId')) {
  activeRecipe.value = recipeLibrary.find((r) => r.id === state.activeRecipeId) || recipeLibrary[0];
}

watchEffect(() => {
  localStorage.setItem(
    'state',
    JSON.stringify({
      displayMode: displayMode.value,
      temperatureUnit: temperatureUnit.value,
      menuMode: menuMode.value,
      waterAmountUpdate: waterAmountUpdate.value,
      coffeeAmountUpdate: coffeeAmountUpdate.value,
      ratioUpdate: ratioUpdate.value,
      activeRecipeId: activeRecipe.value.id,
      recipes: savedRecipes.value,
    })
  );
});

function normalizeRecipe(recipe: Recipe) {
  Object.assign(recipe, savedRecipes.value[recipe.id]);
  return recipe;
}

const brewer = useBrewer(normalizeRecipe(activeRecipe.value));

const recipeKeys = ['waterAmount', 'waterTemp', 'coffeeAmount', 'grind', 'ratio', 'roast'];
watch(
  () => activeRecipe.value,
  (val, oldVal) => {
    const saveExisting = oldVal && (!val || val.id === oldVal.id);
    const loadNew = val && (!oldVal || oldVal.id !== val.id);
    if (saveExisting) {
      savedRecipes.value[oldVal.id] = pick(oldVal, recipeKeys);
    }
    if (loadNew) {
      brewer.loadRecipe(normalizeRecipe(val));
    }
  },
  {
    deep: true,
  }
);

export function useAppState() {
  return {
    menuVisible,
    menuMode,
    displayMode,
    temperatureUnit,
    isFahrenheit,
    isCelcius,
    waterAmountUpdate,
    coffeeAmountUpdate,
    ratioUpdate,
    recipeLibrary,
    activeRecipe,
    savedRecipes,
    brewer,
  };
}
