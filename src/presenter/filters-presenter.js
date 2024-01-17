import {render} from '../framework/render.js';
import FiltersView from '../view/filters.js';
import {filter} from '../utils.js';

export default class FiltersPresenter {
  #container = null;
  #pointsModel = [];
  #filters = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filters = Object.entries(filter).map(
      ([filterType, filterPoints], index) => ({
        type: filterType,
        isChecked: index === 0,
        isDisabled: !filterPoints(this.#pointsModel.get()).length,
      })
    );
  }

  init() {
    render(new FiltersView({items: this.#filters}), this.#container);
  }
}
