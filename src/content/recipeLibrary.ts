import type { RecipeConfig } from '@/use/recipe';
import { deserializeRecipe } from '@/use/recipe';

const recipeLibrary: RecipeConfig[] = [
  {
    id: '2',
    name: 'AeroPress',
    brewId: 'aeropress',
    author: 'Nathan Reyes',
    notes:
      'Inspired by James Hoffmann and his epic AeroPress miniseries, in which he dispels some long-held myths and produces a great brew. Enjoy!',
    roast: 'Light',
    waterAmount: 200,
    waterTemp: 212,
    coffeeAmount: 11,
    coffeeGrind: 'Fine',
    ratio: 18,
    steps: [
      {
        summary: 'Prepare Brew',
        type: 'setup',
        description: 'Load coffee into the aeropress. No need to rinse paper filter.',
        gifUrl: '/2-prep.gif',
      },
      {
        summary: 'Pour 200 grams of water',
        type: 'pour',
        description: 'Try and get coffee wet as quickly as you can.',
        gifUrl: '/2-pour.gif',
        seconds: 15,
      },
      {
        summary: 'Wait for 2 minutes',
        type: 'wait',
        description: 'Remove cup from scale, insert plunger slightly, and wait...patiently.',
        gifUrl: '/2-wait.gif',
        minutes: 2,
      },
      {
        summary: 'Gentle swirl',
        type: 'wait',
        description: `Remember, we're not trying to create a vortex in there. Just trying to settle the coffee a bit.`,
        gifUrl: '/2-swirl.gif',
        seconds: 10,
      },
      {
        summary: 'Wait for 30 seconds',
        type: 'wait',
        description: 'Get ready to show off that pressing form.',
        seconds: 30,
      },
      {
        summary: 'Press the plunger',
        type: 'other',
        description: 'This should be a comfortable motion. Pull back a bit when you are done to help prevent drips.',
        gifUrl: '/2-press.gif',
        seconds: 20,
      },
      {
        summary: 'Enjoy your brew!',
        type: 'complete',
        gifUrl: '/2-enjoy.gif',
      },
    ],
  },
];

export default recipeLibrary.map((r) => deserializeRecipe(r));
