import { ref, watchEffect, computed, watch } from 'vue';
import recipeLibrary from '@/content/recipeLibrary';
import { useDisplayMode } from '@/use/displayMode';
import { useBrewer } from '@/use/brewer';
import type { DisplayMode } from '@/use/displayMode';

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
const activeRecipe = ref(recipeLibrary[0]);
const brewer = useBrewer(activeRecipe);

useDisplayMode(displayMode);

const state = JSON.parse(localStorage.getItem('state') || '{}');
if (state.hasOwnProperty('displayMode')) displayMode.value = state.displayMode;
if (state.hasOwnProperty('temperatureUnit')) temperatureUnit.value = state.temperatureUnit;
if (state.hasOwnProperty('menuMode')) menuMode.value = state.menuMode;
if (state.hasOwnProperty('waterAmountUpdate')) waterAmountUpdate.value = state.waterAmountUpdate;
if (state.hasOwnProperty('coffeeAmountUpdate')) coffeeAmountUpdate.value = state.coffeeAmountUpdate;
if (state.hasOwnProperty('ratioUpdate')) ratioUpdate.value = state.ratioUpdate;
if (state.hasOwnProperty('activeRecipeId')) {
  activeRecipe.value = recipeLibrary.find((r) => r.id === state.activeRecipeId) || recipeLibrary[0];
}

watchEffect(() => {
  const state = {
    displayMode: displayMode.value,
    temperatureUnit: temperatureUnit.value,
    menuMode: menuMode.value,
    waterAmountUpdate: waterAmountUpdate.value,
    coffeeAmountUpdate: coffeeAmountUpdate.value,
    ratioUpdate: ratioUpdate.value,
    activeRecipeId: activeRecipe.value.id,
  };
  localStorage.setItem('state', JSON.stringify(state));
});

watch(
  () => activeRecipe.value,
  (val) => {
    if (!val) return;
    brewer.stopRunning();
    brewer.reset();
    brewer.recipe.value = val;
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
    brewer,
  };
}
