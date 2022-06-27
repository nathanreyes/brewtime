export default [
  {
    name: 'Stagg X',
    type: 'percolation',
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
        summary: 'Prepare AeroPress',
        description: 'Load coffee into the aeropress. No need to rinse paper filter.',
        seconds: 5,
      },
      {
        summary: 'Pour 200 grams of water',
        description: 'Get coffee wet as quickly as you can.',
        seconds: 15,
      },
      {
        summary: 'Wait for 2 minutes',
        description: 'Remove cup from scale, insert plunger slightly, and wait...patiently.',
        minutes: 2,
      },
      {
        summary: 'Gentle swirl',
        description:
          'Remember, you are not trying to create a vortex in there. Just trying to settle the coffee a bit.',
        seconds: 10,
      },
      {
        summary: 'Wait for 30 seconds',
        description: 'Almost time to show off that pressing form.',
        seconds: 30,
      },
      {
        summary: 'Press the plunger',
        description: 'This should be a comfortable motion. Pull back a bit when you are done to help prevent drips.',
        seconds: 20,
      },
    ],
  },
];
