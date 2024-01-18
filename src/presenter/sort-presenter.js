import {render} from '../framework/render.js';
import SortView from '../view/sort.js';
import {SortTypes, enabledSortTypes} from '../const.js';

export default class SortPresenter {
  #container = null;

  constructor({container}) {
    this.#container = container;
  }

  init() {
    render(new SortView(), this.#container);
  }
}
