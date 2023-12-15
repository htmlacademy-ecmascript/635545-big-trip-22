import { getRandomArrayElement } from '../utils.js';
import { POINT_TYPE } from '../const.js';

const eventPointsMock = [
  {
    id: '1',
    basePrice: 100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '4',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: `${getRandomArrayElement(POINT_TYPE)}`,
  },
  {
    id: '2',
    basePrice: 200,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '5',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: `${getRandomArrayElement(POINT_TYPE)}`,
  },
  {
    id: '3',
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '6',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: `${getRandomArrayElement(POINT_TYPE)}`,
  },
];

function getRandomEventPointsMock() {
  return getRandomArrayElement(eventPointsMock);
}

export { getRandomEventPointsMock };
