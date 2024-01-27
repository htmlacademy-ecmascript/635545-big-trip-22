import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeTaskDueDate, ucFirst} from '../utils.js';
import {POINT_TYPE, CITY, DATE_FORMAT_YEAR_DAY_MONTH_HOURS_MINUTE} from '../const.js';

function createEditPointTemplate(
  state,
  arrDestinations,
  arrOffers
) {
  const { basePrice, dateFrom, dateTo, type } = state;
  const selectedDestination = arrDestinations.find(
    ({id}) => id === state.destination
  );

  const currentPointOffers = arrOffers.find((item) => item.type === type).offers;

  const dateStart = humanizeTaskDueDate(dateFrom, DATE_FORMAT_YEAR_DAY_MONTH_HOURS_MINUTE);
  const dateEnd = humanizeTaskDueDate(dateTo, DATE_FORMAT_YEAR_DAY_MONTH_HOURS_MINUTE);

  const createDestinationTemplate = () => {
    if (selectedDestination) {
      const photoListTemplate = () => {
        if (selectedDestination.pictures.length) {
          const photoItemTemplate = (src, title) => `<img class="event__photo" src="${src}" alt="${title}">`;

          return (`
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${selectedDestination.pictures.reduce((sum, current) => sum + photoItemTemplate(current.src, current.description), '')}
              </div>
            </div>
          `);
        } else {
          return '';
        }
      };

      return (
        `
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${selectedDestination ? selectedDestination.description : ''}</p>
          </section>
          ${photoListTemplate()}
        `
      );
    }
    return '';
  };

  function offerItemTemplate (id, title, price) {
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage"
        data-id="${id}"
        ${state.offers.find((item) => item === id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `;
  }

  function offersListTemplate () {
    return currentPointOffers.reduce((sum, current) => sum + offerItemTemplate(current.id, current.title, current.price), '');
  }

  function cityTemplate () {
    return CITY.reduce(
      (sum, current) => `${sum}<option value="${current}"></option>`, ''
    );
  }

  function eventTypeListTemplate () {
    function eventTypeItemTemplate (item) {
      return (
        `<div class="event__type-item">
          <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
          <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${ucFirst(item)}</label>
        </div>`
      );
    }

    return POINT_TYPE.reduce(
      (sum, current) => sum + eventTypeItemTemplate(current), ''
    );
  }

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeListTemplate()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${selectedDestination ? selectedDestination.name : ''}"
              list="destination-list-1">
            <datalist id="destination-list-1">
              ${cityTemplate()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersListTemplate()}
            </div>
          </section>
          ${createDestinationTemplate()}
        </section>
      </form>
    </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  // #editPoint = null;
  #arrDestinations = [];
  #arrOffers = [];
  #onSubmit = null;
  #onClose = null;
  #onDelete = null;
  #datePickerFrom = null;
  #datePickerTo = null;

  constructor({editPoint, arrDestinations, arrOffers, onSubmit, onClose, onDelete}) {
    super();
    // this.#editPoint = editPoint;
    this.#arrDestinations = arrDestinations;
    this.#arrOffers = arrOffers;
    this.#onSubmit = onSubmit;
    this.#onClose = onClose;
    this.#onDelete = onDelete;
    this._setState(EditPointView.pasrsePointToState(editPoint));
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(
      this._state,
      this.#arrDestinations,
      this.#arrOffers,
    );
  }

  reset = (editPoint) => this.updateElement({editPoint});

  #submitSaveBtn = (evt) => {
    evt.preventDefault();
    this.#onSubmit(EditPointView.parseStateToPoint(this._state));
  };

  removeElement = () => {
    super.removeElement();
  };

  _restoreHandlers = () => {
    this.element.addEventListener('submit', this.#submitSaveBtn);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onClose);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.#setDatepickers();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDelete(this._state);
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const selected = this.#arrDestinations.find((item) => item.name === evt.target.value);
    const selectedId = (selected) ? selected.id : null;

    this.updateElement({
      ...this._state,
      destination: selectedId
    });
  };

  #offersChangeHandler = () => {
    const checkedBoxes = this.element.querySelectorAll('.event__offer-checkbox:checked');
    this._setState({
      ...this._state,
      offers: [...checkedBoxes].map((item) => item.dataset.id)
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      ...this._state,
      basePrice: evt.target.value
    });
  };

  #setDatepickers = () => {
    const startDateNode = this.element.querySelector('.event__input--time[name="event-start-time"]');
    const endDateNode = this.element.querySelector('.event__input--time[name="event-end-time"]');

    const flatpickerConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true,
    };

    this.#datePickerFrom = flatpickr(startDateNode, {
      ...flatpickerConfig,
      defaultDate: this._state.dateFrom,
      onClose: this.#closeStartDateHandler,
      maxDate: this._state.dateTo,
    });

    this.#datePickerTo = flatpickr(endDateNode, {
      ...flatpickerConfig,
      defaultDate: this._state.dateTo,
      onClose: this.#closeEndDateHandler,
      minDate: this._state.dateFrom,
    });

  };

  #closeStartDateHandler = ([selectedDate]) => {
    this._setState({
      ...this._state,
      dateFrom: selectedDate
    });

    this.#datePickerTo.set('minDate'. selectedDate);
  };

  #closeEndDateHandler = ([selectedDate]) => {
    this._setState({
      ...this._state,
      dateTo: selectedDate
    });

    this.#datePickerFrom.set('maxDate'. selectedDate);
  };

  static pasrsePointToState = (editPoint) => (editPoint);
  static parseStateToPoint = (state) => state;
}
