import { getRandomArrayElement } from '../utils.js';
import { POINT_TYPE } from '../const.js';

const eventPointsMock = [
  {
    id: '1',
    basePrice: 100,
    dateFrom: '2019-07-10T22:33:56.845Z',
    dateTo: '2019-07-11T07:22:13.375Z',
    destination: '4',
    isFavorite: false,
    offers: ['10', '11', '12'],
    type: `${getRandomArrayElement(POINT_TYPE)}`,
  },
  {
    id: '2',
    basePrice: 200,
    dateFrom: '2019-07-10T11:55:56.845Z',
    dateTo: '2019-07-11T12:22:13.375Z',
    destination: '5',
    isFavorite: false,
    offers: ['11', '12'],
    type: `${getRandomArrayElement(POINT_TYPE)}`,
  },
  {
    id: '3',
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T21:22:13.375Z',
    destination: '6',
    isFavorite: false,
    offers: ['10', '12'],
    type: `${getRandomArrayElement(POINT_TYPE)}`,
  },
];

function getRandomEventPointsMock() {
  return getRandomArrayElement(eventPointsMock);
}

export { getRandomEventPointsMock };
