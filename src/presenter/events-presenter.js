import {render} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list.js';
import EmptyListView from '../view/empty-list.js';
import TripEventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import {sorting, updateItem} from '../utils.js';
import { SortTypes } from '../const.js';

export default class EventsPresenter {
  #emptyListComponent = new EmptyListView();
  #tripEventsListComponent = new TripEventsListView();
  #container = null;
  #eventPointsModel = null;
  #editPointModel = null;
  #destinationModel = null;
  #offersModel = null;
  #eventPoints = [];
  #pointsPresenter = new Map();
  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;

  constructor({container, eventPointsModel, editPointModel, destinationModel, offersModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#editPointModel = editPointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#eventPoints = [...this.#eventPointsModel.get()];
    // this.#eventPoints = [];
  }

  init() {
    if(!this.#eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderList();
  }

  #renderSort() {
    const sortPresenter = new SortPresenter({
      container: this.#container,
      sortTypeHandler: this.#sortTypesChangeHandler,
    });
    sortPresenter.init();
  }

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#eventPoints = sorting[this.#currentSortType](this.#eventPoints);
  };

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #handleDataChange = (updatePoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatePoint);
    this.#pointsPresenter.get(updatePoint.id).init(updatePoint);
  };

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#container);
  }

  #renderList() {
    render(this.#tripEventsListComponent, this.#container);
    this.#sortTypesChangeHandler(this.#defaultSortType);
  }

  #sortTypesChangeHandler = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #renderPoints() {
    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const tripEventPresenter = new TripEventPresenter({
      container: this.#tripEventsListComponent.element,
      editPointModel: this.#editPointModel,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
    });

    tripEventPresenter.init(point);
    this.#pointsPresenter.set(point.id, tripEventPresenter);
  };

}
