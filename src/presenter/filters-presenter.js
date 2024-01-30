import {render} from '../framework/render.js';
import FiltersView from '../view/filters.js';
import {filter} from '../utils.js';
import { UpdateType } from '../const.js';

export default class FiltersPresenter {
  #container = null;
  #pointsModel = [];
  #filtersModel = null;
  #filters = [];

  constructor({container, pointsModel, filtersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#filters = Object.entries(filter).map(
      ([filterType, filterPoints], index) => ({
        type: filterType,
        isChecked: index === 0,
        isDisabled: !filterPoints(this.#pointsModel.get()).length,
      })
    );
  }

  init() {
    render(
      new FiltersView({
        items: this.#filters,
        onItemChange: this.#filterTypesChangeHandler,
      }),
      this.#container
    );
  }

  #filterTypesChangeHandler = (filterType) => {
    this.#filtersModel.set(UpdateType.MAJOR, filterType);
  };
}
