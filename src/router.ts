import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import RecipePage from '@/pages/RecipePage.vue';
import { useAppState } from '@/use/appState';
import recipeLibrary from '@/content/recipeLibrary';

const { menuVisible, activeRecipe } = useAppState();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/:brewId',
    name: 'Brew',
    component: RecipePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // Hide menu
  menuVisible.value = false;
  if (to.name === 'Brew') {
    const brewId = to.params.brewId;
    const recipe = recipeLibrary.find((r) => r.brewId === brewId);
    if (recipe) {
      activeRecipe.value = recipe;
    } else {
      return false;
    }
  }
});

export { router };
