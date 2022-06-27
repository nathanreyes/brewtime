import { ref, computed } from 'vue';
import defaultRecipes from '@/util/defaultRecipes';
import { useDarkMode } from '@/use/darkMode';
import { useRecipe } from '@/use/recipe';
import { useBrewer } from '@/use/brewer';
import type { RecipeConfig } from '@/use/recipe';

export interface AppState {
  recipes: RecipeConfig[];
  isDarkMode: boolean;
}

const isDarkMode = ref(false);
const recipes = computed(() => defaultRecipes.map((r) => useRecipe(r)));
const activeRecipe = computed(() => recipes.value[0]);
const brewer = useBrewer(activeRecipe);

useDarkMode(isDarkMode);

export function useAppState() {
  return { isDarkMode, recipes, activeRecipe, brewer };
}
