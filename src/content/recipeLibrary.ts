import type { RecipeConfig } from '@/use/recipe';
import { deserializeRecipe } from '@/use/recipe';

const recipeLibrary: RecipeConfig[] = [
  {
    id: '7fea1fb7-2c56-448a-9ea1-43e3eb48af95',
    name: 'AeroPress',
    brewId: 'aeropress',
    author: 'Nathan Reyes',
    notes:
      'Inspired by James Hoffmann and his epic AeroPress miniseries, in which he dispels some long-held myths and produces a great brew. Enjoy!',
    url: 'https://www.youtube.com/watch?v=j6VlT_jUVPc',
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
        description:
          'Insert filter into the AeroPress (no need to rinse). Grind and load coffee into AeroPress and place onto scale with cup.',
        gifUrl: '/2-prep.gif',
      },
      {
        summary: 'Pour water',
        type: 'pour',
        description: 'Pour water evenly into AeroPress.',
        gifUrl: '/2-pour.gif',
        seconds: 15,
      },
      {
        summary: 'Wait for 2 minutes',
        type: 'wait',
        description: 'Remove AeroPress and cup from scale. Insert plunger slightly, and wait...patiently.',
        gifUrl: '/2-wait.gif',
        minutes: 2,
      },
      {
        summary: 'Gentle swirl',
        type: 'wait',
        description: `Gently swirl the AeroPress and cup. Remember, we're not trying to create a vortex in there. Just trying to settle the coffee a bit.`,
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
        description: 'Add hot water to taste if needed.',
        type: 'complete',
        gifUrl: '/2-enjoy.gif',
      },
    ],
  },
  {
    id: 'eff3b12e-a38c-48c8-a014-c759da4cd64f',
    name: 'Stagg X',
    brewId: 'stagg-x',
    author: 'Nathan Reyes',
    notes: '',
    url: 'https://coffeeadastra.com/2020/12/09/brewing-with-the-fellow-stagg-x-dripper/',
    roast: 'light',
    waterAmount: 425,
    waterTemp: 210,
    coffeeAmount: 25,
    coffeeGrind: 'Medium Fine',
    ratio: 17,
    steps: [
      {
        summary: 'Prepare brew',
        type: 'setup',
        description:
          'Make a nest shape in the dry coffee bed, and start pouring in the hole during the bloom step. This helps getting water through the bottom layers of the coffee bed a bit faster even with flat-bottom drippers.',
      },
      {
        summary: 'Pour water',
        type: 'pour',
        description:
          'Pour about 2.5 to 3.5 grams of water per gram of dry coffee dose for the bloom. You want to have enough water that you can immediately give the dripper a good swirl to make the surface of the coffee bed even before all water has dripped out.',
        seconds: 8,
      },
      {
        summary: 'Swirl and wait',
        type: 'wait',
        seconds: 38,
      },
    ],
  },
];

export default recipeLibrary.map((r) => deserializeRecipe(r));
