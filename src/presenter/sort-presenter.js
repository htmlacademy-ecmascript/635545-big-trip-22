import {render, replace, remove} from '../framework/render.js';
import SortView from '../view/sort.js';
import {SortTypes, enabledSortTypes} from '../const.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #defaultSortType = null;
  #sortTypeChangeHandler = null;
  #sortComponent = null;

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
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      item: this.#sortTypes,
      onItemChange: this.#sortTypeChangeHandler
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(
        this.#sortComponent,
        this.#container
      );
    }
  }

  destroy() {
    remove(this.#sortComponent);
  }
}
