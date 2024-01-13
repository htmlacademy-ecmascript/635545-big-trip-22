const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITY = ['Minsk', 'Volzhskiy', 'Moscow', 'St. Petersburg', 'Biysk', 'Grodno'];
const NATURAL_NUMBERS = [1,2,3,4,5,6,7,8,9,0];
const DATE_FORMAT_DAY_MONTH = 'DD MMM';
const DATE_FORMAT_YEAR_DAY_MONTH = 'YYYY-MM-DD';
const DATE_FORMAT_HOURS_MINUTE = 'HH:mm';
const DATE_FORMAT_YEAR_DAY_MONTH_HOURS_MINUTE = 'DD/MM/YY HH:mm';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const EmptyListText = {
  Everthing: 'Click New Event to create your first point',
  Past: 'There are no past events now',
  Present: 'There are no present events now',
  Future: 'There are no future events now',
};


export {
  POINT_TYPE,
  CITY,
  NATURAL_NUMBERS,
  DATE_FORMAT_DAY_MONTH,
  DATE_FORMAT_YEAR_DAY_MONTH,
  DATE_FORMAT_HOURS_MINUTE,
  DATE_FORMAT_YEAR_DAY_MONTH_HOURS_MINUTE,
  Mode,
  EmptyListText,
};
