import dayjs from 'dayjs';

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

export {getRandomArrayElement , humanizeTaskDueDate, dateDif, updateItem};
