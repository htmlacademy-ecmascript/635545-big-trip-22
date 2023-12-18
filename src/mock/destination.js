import { getRandomArrayElement } from '../utils.js';
import { NATURAL_NUMBERS } from '../const.js';

const destinationMock = [
  {
    id: '4',
    description:
      'Minsk, is a beautiful city',
    name: 'Minsk',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'random-img',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'random-img',
      },
    ],
  },
  {
    id: '5',
    description:
      'Volzhskiy, is a beautiful city.',
    name: 'Volzhskiy',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'random-img',
      },
    ],
  },
  {
    id: '6',
    description:
      'Moscow, is a beautiful city.',
    name: 'Moscow',
    pictures: [],
  },
  {
    id: '7',
    description:
      'St. Petersburg, is a beautiful city.',
    name: 'St. Petersburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'random-img',
      },
    ],
  },
  {
    id: '8',
    description:
      'Biysk, is a beautiful city.',
    name: 'Biysk',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'random-img',
      },
    ],
  },
  {
    id: '9',
    description:
      'Grodno, is a beautiful city.',
    name: 'Grodno',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(NATURAL_NUMBERS)}`,
        description: 'random-img',
      },
    ],
  },
];

function getRandomDestinationMock() {
  return getRandomArrayElement(destinationMock);
}

export { getRandomDestinationMock };
