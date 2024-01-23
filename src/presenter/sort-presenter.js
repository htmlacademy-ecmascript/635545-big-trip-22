import {render} from '../framework/render.js';
import SortView from '../view/sort.js';
import {SortTypes, enabledSortTypes} from '../const.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #defaultSortType = null;
  #sortTypeChangeHandler = null;

  constructor({container, sortTypeHandler, defaultSortType}) {
    this.#container = container;
    this.#defaultSortType = defaultSortType;
    this.#sortTypes = Object.values(SortTypes).map((type) => ({
      type,
      isChecked: type === this.#defaultSortType,
      isDisabled: !enabledSortTypes[type],
    }));
    this.#sortTypeChangeHandler = sortTypeHandler;
  }

  init() {
    render(
      new SortView({
        item: this.#sortTypes,
        onItemChange: this.#sortTypeChangeHandler
      }),
      this.#container
    );
  }
}
