import dayjs from 'dayjs';
import {FilterTypes, SortTypes, DESTINATION_ITEM_COUNT} from './const.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function getTwoString(str) {
  return (`${str}`.length < 2) ? `0${str}` : `${str}`;
}

function dateDif(date1 , date2) {
  const result = dayjs(date1).diff(dayjs(date2), 'minute');
  if (Math.trunc(result / 60) >= 24) {
    return `${getTwoString(Math.trunc(result / (24 * 60)))}D ${getTwoString(result % 24 % 60)}H ${getTwoString(result % 60)}M`;
  } else if (result >= 60) {
    return `${getTwoString(Math.trunc(result / 60))}H ${getTwoString(result % 60)}M`;
  }
  return `${getTwoString(result)}M`;
}

function ucFirst(str) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const isPointFuture = (point) => dayjs().isBefore(point.dateFrom);
const isPointPresent = (point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateFrom);
const isPointPast = (point) => dayjs().isAfter(point.dateFrom);

const filter = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter(isPointFuture),
  [FilterTypes.PRESENT]: (points) => points.filter(isPointPresent),
  [FilterTypes.PAST]: (points) => points.filter(isPointPast),
};

const getPointsByDate = (pointA, pointB) =>
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const getPointsByTime = (pointA, pointB) =>
  dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
const getPointsByPrice = (pointA, pointB) =>
  pointB.basePrice - pointA.basePrice;

const sorting = {
  [SortTypes.DAY]: (points) => [...points].sort(getPointsByDate),
  [SortTypes.EVENT]: () => {
    throw new Error(`Sort by ${SortTypes.EVENT} is disabled`);
  },
  [SortTypes.TIME]: (points) => [...points].sort(getPointsByTime),
  [SortTypes.PRICE]: (points) => [...points].sort(getPointsByPrice),
  [SortTypes.OFFER]: () => {
    throw new Error(`Sort by ${SortTypes.OFFER} is disabled`);
  }
};

const isMinorChange = (pointA, pointB) => pointA.dateFrom !== pointB.dateFrom || pointA.basePrice !== pointB.basePrice || dateDif(pointA.dateFrom, pointA.dateTo) !== dateDif(pointB.dateFrom, pointB.dateTo);

const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    basePrice: point['base_price'],
    isFavorite: point['is_favorite'],
  };

  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['base_price'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
};

const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['base_price']: point.basePrice,
    ['is_favorite']: point.isFavorite,
  };

  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.basePrice;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};

const getTripRoute = (
  points = [],
  destinations = [],
) => {
  const destinationNames = sorting[SortTypes.DAY]([...points]).map(
    (point) =>
      destinations.find((destination) => destination.id === point.destination)
        .name
  );

  return destinationNames <= DESTINATION_ITEM_COUNT
    ? destinationNames.join('&nbsp;&mdash;&nbsp;')
    : `${destinationNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames.at(-1)}`;
};

const getTripPeriod = (points = []) => {
  const sortedPoints = sorting[SortTypes.DAY]([...points]);

  return sortedPoints.length
    ? `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')} - ${dayjs(sortedPoints.at(-1).dateTo).format('DD MMM')}`
    : '';
};

const getCheckedOffers = (offers, type) =>
  offers.find((offer) => offer.type === type)?.offers;

const getOffersCost = (offerIDs = [], offers = []) =>
  offerIDs.reduce((offerCost, id) =>
    offerCost + (offers.find((offer) => offer.id === id)?.price ?? 0), 0
  );

const getTripCost = (points = [], offers = []) => points.reduce((total, point) =>
  total +
  point.basePrice +
  getOffersCost(points.offers, getCheckedOffers(offers, point.type)), 0
);

export {
  getTripCost,
  getTripPeriod,
  getTripRoute,
  adaptToServer,
  adaptToClient,
  getRandomArrayElement,
  humanizeTaskDueDate,
  dateDif,
  updateItem,
  filter,
  sorting,
  ucFirst,
  isMinorChange
};
