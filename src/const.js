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

const EditType = {
  CREATING: 'CREATING',
  EDITING: 'EDITING',
};

const EmptyListText = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const enabledSortTypes = {
  [SortTypes.DAY]: true,
  [SortTypes.EVENT]: false,
  [SortTypes.TIME]: true,
  [SortTypes.PRICE]: true,
  [SortTypes.OFFER]: false,
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CREATE_POINT: 'CREATE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
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
  FilterTypes,
  SortTypes,
  enabledSortTypes,
  UserAction,
  UpdateType,
  EditType,
};
