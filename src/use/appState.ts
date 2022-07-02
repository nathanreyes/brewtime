import { ref, watchEffect, computed } from 'vue';
import recipeLibrary from '@/content/recipeLibrary';
import { useDisplayMode } from '@/use/displayMode';
import { useBrewer } from '@/use/brewer';
import type { DisplayMode } from '@/use/displayMode';

type MenuMode = 'favorites' | 'library' | 'settings';
type TemperatureUnit = 'c' | 'f';

const activeRecipe = ref(recipeLibrary[0]);
const menuVisible = ref(false);
const menuMode = ref<MenuMode>('library');
const displayMode = ref<DisplayMode>('light');
const temperatureUnit = ref<TemperatureUnit>('f');
const isFahrenheit = computed(() => temperatureUnit.value === 'f');
const isCelcius = computed(() => temperatureUnit.value === 'c');
const waterAmountUpdate = ref<'coffee' | 'ratio'>('coffee');
const coffeeAmountUpdate = ref<'water' | 'ratio'>('ratio');
const ratioUpdate = ref<'water' | 'coffee'>('coffee');
const brewer = useBrewer(activeRecipe);

useDisplayMode(displayMode);

const state = JSON.parse(localStorage.getItem('state') || '{}');
if (state.hasOwnProperty('displayMode')) displayMode.value = state.displayMode;
if (state.hasOwnProperty('temperatureUnit')) temperatureUnit.value = state.temperatureUnit;
if (state.hasOwnProperty('menuVisible')) menuVisible.value = state.menuVisible;
if (state.hasOwnProperty('menuMode')) menuMode.value = state.menuMode;
if (state.hasOwnProperty('activeRecipeId')) {
  activeRecipe.value = recipeLibrary.find((r) => r.id === state.activeRecipeId) || recipeLibrary[0];
}

watchEffect(() => {
  const state = {
    displayMode: displayMode.value,
    temperatureUnit: temperatureUnit.value,
    menuVisible: menuVisible.value,
    menuMode: menuMode.value,
    activeRecipeId: activeRecipe.value.id,
  };
  localStorage.setItem('state', JSON.stringify(state));
});

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
