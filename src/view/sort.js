import AbstractView from '../framework/view/abstract-view.js';
import {SortTypes2} from '../const.js';

function createSortRowTemplate(types) {
  return types.reduce(
    (markup, {type, isDisabled, isChecked}) => `${markup}
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input
          id="sort-${type}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${type}"
          data-sort="${type}"
          ${isDisabled ? 'disabled' : ''}
          ${isChecked ? 'checked' : ''}
        >
        <label class="trip-sort__btn" for="sort-${type}">${type}</label>
      </div>
    `,
    ''
  );
}

function createSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortRowTemplate(SortTypes2)}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #clickSortBtn = null;

  constructor({onSort}) {
    super();
    this.#clickSortBtn = onSort;
    this.element.querySelectorAll('.trip-sort__item').forEach((item) => {
      item.addEventListener('click', this.#clickSort);
    });
  }

  get template() {
    return createSortTemplate();
  }

  #clickSort = () => {
    console.log(this);
    this.#clickSortBtn();
  };
}
