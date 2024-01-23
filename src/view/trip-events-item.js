import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTaskDueDate, dateDif} from '../utils.js';
import {DATE_FORMAT_DAY_MONTH, DATE_FORMAT_YEAR_DAY_MONTH, DATE_FORMAT_HOURS_MINUTE} from '../const.js';

function createTripEventsItemTemplate(point, destination, arrOffers) {
  const { basePrice, dateFrom, dateTo, isFavorite, type} = point;
  const { name } = destination ?? '';

  const dateStartDayMonth = humanizeTaskDueDate(dateFrom, DATE_FORMAT_DAY_MONTH);
  const dateStartDatetime = humanizeTaskDueDate(dateFrom, DATE_FORMAT_YEAR_DAY_MONTH);
  const dateStartHoursMinute = humanizeTaskDueDate(dateFrom, DATE_FORMAT_HOURS_MINUTE);
  const dateEndHoursMinute = humanizeTaskDueDate(dateTo, DATE_FORMAT_HOURS_MINUTE);

  const currentPointOffers = arrOffers.find((item) => item.type === type).offers;

  function offersListTemplate () {
    return currentPointOffers.reduce((sum, current) => sum + offerItemTemplate(current.id, current.title, current.price), '');
  }

  function offerItemTemplate (title, price) {
    return `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>
    `;
  }

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateStartDatetime}">${dateStartDayMonth}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${dateStartHoursMinute}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${dateEndHoursMinute}</time>
          </p>
          <p class="event__duration">${dateDif(dateTo, dateFrom, 'minute')}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersListTemplate()}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
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

export default class TripEventsItemView extends AbstractView {
  #point = null;
  #destination = null;
  #arrOffers = [];
  #rollupBtnClick = null;
  #favoriteBtnClick = null;

  constructor({point, destination, arrOffers, onClickRollupBtn, onClickFavoriteBtn}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#arrOffers = arrOffers;
    this.#rollupBtnClick = onClickRollupBtn;
    this.#favoriteBtnClick = onClickFavoriteBtn;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickRollupBtn);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#clickFavoriteBtn);
  }

  get template() {
    return createTripEventsItemTemplate(
      this.#point,
      this.#destination,
      this.#arrOffers
    );
  }

  #clickRollupBtn = (evt) => {
    evt.preventDefault();
    this.#rollupBtnClick();
  };

  #clickFavoriteBtn = (evt) => {
    evt.preventDefault();
    this.#favoriteBtnClick();
  };
}
