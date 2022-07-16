import type { RecipeConfig } from '@/use/recipe';
import { useRecipe } from '@/use/recipe';

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
    grind: 'Fine',
    ratio: 18,
    steps: [
      {
        summary: 'Prepare Brew',
        type: 'setup',
        description:
          'Insert filter into the AeroPress (no need to rinse). Grind and load coffee into AeroPress and place onto scale with cup.',
        imgUrls: ['7fea1fb7-2c56-448a-9ea1-43e3eb48af95/prep.gif'],
      },
      {
        summary: 'Pour water',
        type: 'pour',
        description: 'Pour water evenly into AeroPress.',
        imgUrls: ['7fea1fb7-2c56-448a-9ea1-43e3eb48af95/pour.gif'],
        seconds: 15,
      },
      {
        summary: 'Wait for 2 minutes',
        type: 'wait',
        description: 'Remove AeroPress and cup from scale. Insert plunger slightly, and wait...patiently.',
        imgUrls: ['7fea1fb7-2c56-448a-9ea1-43e3eb48af95/wait.gif'],
        minutes: 2,
      },
      {
        summary: 'Gentle swirl',
        type: 'wait',
        description: `Gently swirl the AeroPress and cup. Remember, we're not trying to create a vortex in there. Just trying to settle the coffee a bit.`,
        imgUrls: ['7fea1fb7-2c56-448a-9ea1-43e3eb48af95/swirl.gif'],
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
        imgUrls: ['7fea1fb7-2c56-448a-9ea1-43e3eb48af95/press.gif'],
        seconds: 20,
      },
      {
        summary: 'Enjoy your brew!',
        description: 'Add hot water to taste if needed.',
        type: 'complete',
        imgUrls: ['7fea1fb7-2c56-448a-9ea1-43e3eb48af95/enjoy.gif'],
      },
    ],
  },
  {
    id: 'eff3b12e-a38c-48c8-a014-c759da4cd64f',
    name: 'Stagg X',
    brewId: 'stagg-x',
    author: 'Nathan Reyes',
    notes: `Learn how to brew coffee using the Stagg X from Fellow with Dylan Siemens, the 2017 US Brewer's Cup Champion and Head Trainer for Onyx Coffee Lab.`,
    url: 'https://www.youtube.com/watch?v=5tuFYrlsbD4',
    roast: 'Light',
    waterAmount: 350,
    waterTemp: 200,
    coffeeAmount: 22,
    grind: 'Medium',
    ratio: 16,
    steps: [
      {
        summary: 'Prepare brew',
        type: 'setup',
        description:
          'Heat water and prewet filter. Remember to dump your preheat water. Grind and throw coffee into the Stagg X. Shake the bed flat.',
        imgUrls: ['/eff3b12e-a38c-48c8-a014-c759da4cd64f/prep.gif'],
      },
      {
        summary: 'First pour: The bloom',
        type: 'pour',
        description: 'Pour about {{ 2 * recipe.coffeeAmount }}g to {{ 2.5 * recipe.coffeeAmount }}g for the bloom.',
        imgUrls: ['/eff3b12e-a38c-48c8-a014-c759da4cd64f/bloom.gif'],
        seconds: 10,
      },
      {
        summary: 'Wait',
        type: 'wait',
        description: 'Just waiting for the second pour...',
        seconds: 20,
      },
      {
        summary: 'Second pour to 200g',
        type: 'pour',
        description:
          'Start in the center. Make four circles moving outward concentrically. The forth circle will rinse some coffee off of the filter. Then, pour three circles moving back towards the center. Three more circles back out. The water should be at just over 200g.',
        imgUrls: ['/eff3b12e-a38c-48c8-a014-c759da4cd64f/second-pour.gif'],
        seconds: 25,
      },
      {
        summary: 'Wait',
        type: 'wait',
        description: 'Just waiting for the third pour...',
        seconds: 25,
      },
      {
        summary: 'Third pour to {{ recipe.waterAmount }}g',
        type: 'pour',
        description:
          'Make the third pour starting from the center. Move slowly enough so you can see a little bit of bubbling and agitation in the coffee. Pour up to {{ recipe.waterAmount}}g. You want to be done pouring by 2 minutes.',
        imgUrls: ['/eff3b12e-a38c-48c8-a014-c759da4cd64f/third-pour.gif'],
        seconds: 20,
      },
      {
        summary: 'Let it flow!',
        type: 'complete',
        description: 'Let the coffee drip out. Savor the sweetness. Enjoy!',
        imgUrls: ['/eff3b12e-a38c-48c8-a014-c759da4cd64f/savor.gif'],
      },
    ],
  },
  {
    id: 'c71e06b3-7b07-4043-b1dd-9e59da272cff',
    name: 'Hario V60',
    brewId: 'hario-v60',
    author: 'Nathan Reyes',
    notes: `This is James Hoffmann's recommended technique for making coffee with the Hario V60, and any other cone-shaped brewer with a large open area.`,
    url: 'https://www.youtube.com/watch?v=AI4ynXzkSQo&t=240s',
    roast: 'Light',
    waterAmount: 500,
    waterTemp: 202,
    coffeeAmount: 30,
    grind: 'Med Fine',
    ratio: 16.7,
    steps: [
      {
        summary: 'Prepare brew',
        type: 'setup',
        description:
          'Have a spoon on-hand. Rinse out your filter paper to help remove papery taste and preheat your brewer. Grind and load your coffee into the center of the V60. Create a well in the center of your grounds.',
        imgUrls: [
          '/c71e06b3-7b07-4043-b1dd-9e59da272cff/prep-rinse.gif',
          '/c71e06b3-7b07-4043-b1dd-9e59da272cff/prep-well.gif',
        ],
      },
      {
        summary: 'First pour: The bloom',
        type: 'pour',
        description: 'Gently pour about {{ 2 * recipe.coffeeAmount }}g of water to get all of the coffee wet.',
        imgUrls: ['/c71e06b3-7b07-4043-b1dd-9e59da272cff/bloom.gif'],
        seconds: 10,
      },
      {
        summary: 'Swirl',
        type: 'swirl',
        description: 'Swirl the coffee in a circular motion to ensure the water and coffee are mixed evenly.',
        imgUrls: ['/c71e06b3-7b07-4043-b1dd-9e59da272cff/swirl.gif'],
        seconds: 10,
      },
      {
        summary: 'Rest',
        type: 'wait',
        description: 'Let the coffee rest for up to 30 to 45 seconds.',
        seconds: 35,
      },
      {
        summary: 'Pour up to {{ 0.6 * recipe.waterAmount }}g for phase 1',
        type: 'pour',
        description:
          'Here we want to get up to 60% of our brew in the first pour phase. We are looking to agitate the coffee but not so much that we get an uneven extraction.',
        imgUrls: ['/c71e06b3-7b07-4043-b1dd-9e59da272cff/pour-1.gif'],
        seconds: 30,
      },
      {
        summary: 'Pour up to {{ recipe.waterAmount }}g for phase 2',
        type: 'pour',
        description:
          'Pour more slowly and gently than the first phase. We want to maintain the water level and and keep the temperature up.',
        imgUrls: ['/c71e06b3-7b07-4043-b1dd-9e59da272cff/pour-2.gif'],
        seconds: 30,
      },
      {
        summary: 'Stir',
        type: 'stir',
        description: 'Stir the brew a little in both directions.',
        imgUrls: ['/c71e06b3-7b07-4043-b1dd-9e59da272cff/stir.gif'],
        seconds: 10,
      },
      {
        summary: 'Drain & Swirl',
        type: 'wait',
        description:
          'Allow the brew to drain just a little bit until it feels safe to give it one final swirl. This will help keep the bed flat and give you the most common extraction.',
        imgUrls: ['/c71e06b3-7b07-4043-b1dd-9e59da272cff/swirl-2.gif'],
        seconds: 10,
      },
      {
        summary: 'Drawdown & Drink',
        type: 'complete',
        description:
          'Allow the brew to draw down. There should be a flat bed of coffee remaining. Pour your cup and enjoy!',
        imgUrls: ['/c71e06b3-7b07-4043-b1dd-9e59da272cff/enjoy.gif'],
      },
    ],
  },
];

export default recipeLibrary.map((r) => useRecipe(r));
