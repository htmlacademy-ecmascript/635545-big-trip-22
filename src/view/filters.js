import AbstractView from '../framework/view/abstract-view.js';

function createFiltersRowTemplate(types) {
  return types.reduce(
    (markup, {type, isDisabled, isChecked}) => `${markup}
      <div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>
    `,
    ''
  );
}

function createFiltersTemplate(FilterTypes) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${createFiltersRowTemplate(FilterTypes)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  #items = [];

  constructor({items}) {
    super();
    this.#items = items;
  }

  get template() {
    return createFiltersTemplate(this.#items);
  }
}
