import RadioListView from './radio-list.js';

function createFiltersRowTemplate(filters) {
  return filters.reduce(
    (markup, {type, isDisabled, isChecked}) => `${markup}
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          data-item="${type}"
          ${isDisabled ? 'disabled' : ''}
          ${isChecked ? 'checked' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>
    `,
    ''
  );
}

function createFiltersTemplate(filters) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${createFiltersRowTemplate(filters)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends RadioListView {
  get template() {
    return createFiltersTemplate(this._items);
  }
}
