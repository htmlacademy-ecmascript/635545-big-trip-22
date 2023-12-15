import { getRandomArrayElement } from '../utils.js';
import { NATURAL_NUMBERS } from '../const.js';

const destinationMock = [
  // {
  //   pointType: `${getRandomArrayElement(POINT_TYPE)}`,
  //   cityType: `${getRandomArrayElement(CITY)}`,
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  // src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
  //   offers: [
  //     'Add luggage',
  //     'Switch to comfort class',
  //     'Add meal',
  //     'Choose seats',
  //     'Travel by train'
  //   ],
  //   startTime: '19/03/19 00:00',
  //   endTime: '19/03/19 00:00',
  //   value: '12',
  // },
  {
    id: '4',
    description:
      'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'Chamonix parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'Chamonix parliament building',
      },
    ],
  },
  {
    id: '5',
    description:
      'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'Chamonix parliament building',
      },
    ],
  },
  {
    id: '6',
    description:
      'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [],
  },
];

// function getRandomDestinationMock() {
//   return getRandomArrayElement(destinationMock);
// }

export { destinationMock };
