import type { RecipeConfig } from '@/use/recipe';
import { deserializeRecipe } from '@/use/recipe';

const recipeLibrary: RecipeConfig[] = [
  {
    id: '1',
    name: 'Stagg X',
    brewId: 'stagg-x',
    author: 'Nathan Reyes',
    notes: 'This is the best pourover recipe of all time.',
    grind: 'Fine',
    roast: 'Light',
    waterAmount: '350g',
    waterTemp: '202',
    coffeeAmount: '20g',
    ratio: '16:1',
    steps: [
      {
        summary: 'Prepare Brew',
        type: 'setup',
        description: 'Load coffee into the aeropress. No need to rinse paper filter.',
        seconds: 3,
      },
      {
        summary: 'Pour 200 grams of water',
        type: 'pour',
        description: 'Get coffee wet as quickly as you can.',
        seconds: 3,
      },
      {
        summary: 'Enjoy your coffee!',
        type: 'complete',
        gifUrl: 'https://media.giphy.com/media/vJiurtzDcjUGxJqXCs/giphy.gif',
      },
    ],
  },
  {
    id: '2',
    name: 'AeroPress',
    brewId: 'aeropress',
    author: 'Nathan Reyes',
    notes:
      'Inspired by James Hoffman and his epic AeroPress miniseries, in which he dispels some long-held myths and produces a great brew. Enjoy!',
    grind: 'Fine',
    roast: 'Light',
    waterAmount: '350g',
    waterTemp: 'Boil',
    coffeeAmount: '16g',
    ratio: '16:1',
    steps: [
      {
        summary: 'Prepare Brew',
        type: 'setup',
        description: 'Load coffee into the aeropress. No need to rinse paper filter.',
      },
      {
        summary: 'Pour 200 grams of water',
        type: 'pour',
        description: 'Get coffee wet as quickly as you can.',
        seconds: 15,
      },
      {
        summary: 'Wait for 2 minutes',
        type: 'wait',
        description: 'Remove cup from scale, insert plunger slightly, and wait...patiently.',
        minutes: 2,
      },
      {
        summary: 'Gentle swirl',
        type: 'wait',
        description:
          'Remember, you are not trying to create a vortex in there. Just trying to settle the coffee a bit.',
        seconds: 10,
      },
      {
        summary: 'Wait for 30 seconds',
        type: 'wait',
        description: 'Almost time to show off that pressing form.',
        seconds: 30,
      },
      {
        summary: 'Press the plunger',
        type: 'other',
        description: 'This should be a comfortable motion. Pull back a bit when you are done to help prevent drips.',
        seconds: 20,
      },
      {
        summary: 'Drink it up!',
        type: 'complete',
        gifUrl: 'https://media.giphy.com/media/DrJm6F9poo4aA/giphy.gif',
      },
    ],
  },
];

export default recipeLibrary.map((r) => deserializeRecipe(r));
