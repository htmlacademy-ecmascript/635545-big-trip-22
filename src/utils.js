import dayjs from 'dayjs';
import {FilterTypes} from './const.js';
import {SortTypes} from './const.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function dateDif(date1 , date2, format) {
  return dayjs(date1).diff(dayjs(date2), format);
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

export {
  getRandomArrayElement,
  humanizeTaskDueDate,
  dateDif,
  updateItem,
  filter,
  sorting,
};
