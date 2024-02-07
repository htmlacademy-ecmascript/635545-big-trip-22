import {render, remove, replace} from '../framework/render.js';
import FiltersView from '../view/filters.js';
import {filter} from '../utils.js';
import { UpdateType } from '../const.js';

export default class FiltersPresenter {
  #container = null;
  #pointsModel = null;
  #filtersModel = null;
  #filterComponent = null;
  #currentFilter = null;

  constructor({container, pointsModel, filtersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const points = this.#pointsModel.get();

    return Object.entries(filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        isChecked: filterType === this.#currentFilter,
        isDisabled: !filterPoints(points).length,
      })
    );
  }

  init() {
    this.#currentFilter = this.#filtersModel.get();
    const filters = this.filters;
    const prevFiltersComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView ({
      items: filters,
      onItemChange: this.#filterTypesChangeHandler,
    });

    if (!prevFiltersComponent) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #filterTypesChangeHandler = (filterType) => {
    this.#filtersModel.set(UpdateType.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
