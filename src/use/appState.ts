import { ref, watchEffect } from 'vue';
import recipeLibrary from '@/content/recipeLibrary';
import { useDisplayMode } from '@/use/displayMode';
import { useBrewer } from '@/use/brewer';
import type { Recipe } from '@/use/recipe';
import type { DisplayMode } from '@/use/displayMode';

type MenuMode = 'favorites' | 'library' | 'settings';

const activeRecipe = ref<Recipe>(recipeLibrary[0]);
const menuVisible = ref(false);
const menuMode = ref<MenuMode>('library');
const displayMode = ref<DisplayMode>('light');
const brewer = useBrewer(activeRecipe);

useDisplayMode(displayMode);

const state = JSON.parse(localStorage.getItem('state') || '{}');
if (state.hasOwnProperty('displayMode')) displayMode.value = state.displayMode;
if (state.hasOwnProperty('menuVisible')) menuVisible.value = state.menuVisible;
if (state.hasOwnProperty('menuMode')) menuMode.value = state.menuMode;
if (state.hasOwnProperty('activeRecipeId')) {
  activeRecipe.value = recipeLibrary.find((r) => r.id === state.activeRecipeId) || recipeLibrary[0];
}

watchEffect(() => {
  const state = {
    displayMode: displayMode.value,
    menuVisible: menuVisible.value,
    menuMode: menuMode.value,
    activeRecipeId: activeRecipe.value.id,
  };
  localStorage.setItem('state', JSON.stringify(state));
});

export function useAppState() {
  return { menuVisible, menuMode, displayMode, recipeLibrary, activeRecipe, brewer };
}
