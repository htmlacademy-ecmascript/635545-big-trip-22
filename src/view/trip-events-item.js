import {createElement} from '../render.js';
import {humanizeTaskDueDate, dateDif} from '../utils.js';
import {DATE_FORMAT_DAY_MONTH, DATE_FORMAT_YEAR_DAY_MONTH, DATE_FORMAT_HOURS_MINUTE} from '../const.js';

function createTripEventsItemTemplate(points) {
  const { basePrice, dateFrom, dateTo} = points;

  const dateStartDayMonth = humanizeTaskDueDate(dateFrom, DATE_FORMAT_DAY_MONTH);
  const dateStartDatetime = humanizeTaskDueDate(dateFrom, DATE_FORMAT_YEAR_DAY_MONTH);
  const dateStartHoursMinute = humanizeTaskDueDate(dateFrom, DATE_FORMAT_HOURS_MINUTE);
  const dateEndHoursMinute = humanizeTaskDueDate(dateTo, DATE_FORMAT_HOURS_MINUTE);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateStartDatetime}">${dateStartDayMonth}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Taxi Amsterdam</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${dateStartHoursMinute}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${dateEndHoursMinute}</time>
          </p>
          <p class="event__duration">${dateDif(dateTo, dateFrom, 'minute')}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">20</span>
          </li>
        </ul>
        <button class="event__favorite-btn event__favorite-btn--active" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}


export default class TripEventsItemView {
  constructor({points}) {
    this.points = points;
  }

  getTemplate() {
    return createTripEventsItemTemplate(this.points);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
