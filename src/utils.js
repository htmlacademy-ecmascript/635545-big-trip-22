import dayjs from 'dayjs';
import {FilterTypes} from './const.js';
import {SortTypes} from './const.js';

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
  dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
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

export {
  getRandomArrayElement,
  humanizeTaskDueDate,
  dateDif,
  updateItem,
  filter,
  sorting,
  ucFirst,
  isMinorChange
};
