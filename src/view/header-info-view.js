import AbstractView from '../framework/view/abstract-view.js';
import {getTripCost, getTripPeriod, getTripRoute} from '../utils.js';

function createHeaderInfoTemplate({isEmpty, route, duration, cost}) {
  return (
    isEmpty
      ? `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">Loading...</h1>
          <p class="trip-info__dates">Loading...</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">Loading...</span>
        </p>
      </section>`
      : `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${route}</h1>
          <p class="trip-info__dates">${duration}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
        </p>
      </section>`
  );
}


export default class HeaderInfoView extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor ({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createHeaderInfoTemplate({
      isEmpty: this.#points.length === 0,
      route: getTripRoute(this.#points, this.#destinations),
      duration: getTripPeriod(this.#points),
      cost: getTripCost(this.#points, this.#offers)
    });
  }
}
