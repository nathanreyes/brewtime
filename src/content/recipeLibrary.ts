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
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/aeropress/7fea1fb7-2c56-448a-9ea1-43e3eb48af95/prep_cVPCqupYD.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812972141',
      },
      {
        summary: 'Pour water',
        type: 'pour',
        description: 'Pour water evenly into AeroPress.',
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/aeropress/7fea1fb7-2c56-448a-9ea1-43e3eb48af95/pour_RZETtn8TPw.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812973812',
        seconds: 15,
      },
      {
        summary: 'Wait for 2 minutes',
        type: 'wait',
        description: 'Remove AeroPress and cup from scale. Insert plunger slightly, and wait...patiently.',
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/aeropress/7fea1fb7-2c56-448a-9ea1-43e3eb48af95/wait_O36H0nW3d.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812975437',
        minutes: 2,
      },
      {
        summary: 'Gentle swirl',
        type: 'wait',
        description: `Gently swirl the AeroPress and cup. Remember, we're not trying to create a vortex in there. Just trying to settle the coffee a bit.`,
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/aeropress/7fea1fb7-2c56-448a-9ea1-43e3eb48af95/swirl_BXEE9uks3.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812978540',
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
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/aeropress/7fea1fb7-2c56-448a-9ea1-43e3eb48af95/press_oZTjfaHJe.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812976992',
        seconds: 20,
      },
      {
        summary: 'Enjoy your brew!',
        description: 'Add hot water to taste if needed.',
        type: 'complete',
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/aeropress/7fea1fb7-2c56-448a-9ea1-43e3eb48af95/enjoy_qLIo89hQ2.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812980016',
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
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/stagg-x/eff3b12e-a38c-48c8-a014-c759da4cd64f/prep_rGcHczk-w.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812638241',
      },
      {
        summary: 'First pour: The bloom',
        type: 'pour',
        description: 'Pour about {{ 2 * recipe.coffeeAmount }}g to {{ 2.5 * recipe.coffeeAmount }}g for the bloom.',
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/stagg-x/eff3b12e-a38c-48c8-a014-c759da4cd64f/bloom_KKi98_L2X.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812641384',
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
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/stagg-x/eff3b12e-a38c-48c8-a014-c759da4cd64f/second-pour_QZ0mr-PAC.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812639941',
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
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/stagg-x/eff3b12e-a38c-48c8-a014-c759da4cd64f/third-pour_JM8NIhBkb.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812644448',
        seconds: 20,
      },
      {
        summary: 'Let it flow!',
        type: 'complete',
        description: 'Let the coffee drip out. Savor the sweetness. Enjoy!',
        imgUrl:
          'https://ik.imagekit.io/hkgymzunht/gifmycoffee/stagg-x/eff3b12e-a38c-48c8-a014-c759da4cd64f/savor_pYq4iSa_3z.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1657812642895',
      },
    ],
  },
];

export default recipeLibrary.map((r) => useRecipe(r));
