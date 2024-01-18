import {render} from '../framework/render.js';
import SortView from '../view/sort.js';
import {SortTypes, enabledSortTypes} from '../const.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #currentSortType = SortTypes.DAY;

  constructor({container}) {
    this.#container = container;
    this.#sortTypes = Object.values(SortTypes).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortTypes[type],
    }));
  }

  init() {
    render(new SortView({item: this.#sortTypes}), this.#container);
  }
}
