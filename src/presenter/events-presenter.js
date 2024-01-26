import {render} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list.js';
import EmptyListView from '../view/empty-list.js';
import TripEventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import {sorting, updateItem} from '../utils.js';
import { SortTypes, UpdateType } from '../const.js';

export default class EventsPresenter {
  #emptyListComponent = new EmptyListView();
  #tripEventsListComponent = new TripEventsListView();
  #container = null;
  #eventPointsModel = null;
  #filterModel = null;
  #destinationModel = null;
  #offersModel = null;
  #eventPoints = [];
  #pointsPresenter = new Map();
  #currentSortType = SortTypes.DAY;
  #sortPresenter = null;

  constructor({container, eventPointsModel, destinationModel, offersModel, filterModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#eventPoints = [...this.#eventPointsModel.get()];
    // Для пустого листа this.#eventPoints = [];
    this.#eventPointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  init() {
    if(!this.#eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderList();
  }

  #modelEventHandler = (updateType, data) => {
    if(updateType === UpdateType.PATCH) {
      this.#pointsPresenter.get(data.id).init(data);
    }
    if(updateType === UpdateType.MINOR) {
      // очистить список
      // отредндерить заново
    }
    if(updateType === UpdateType.MAJOR) {
      // сброс сортировки
      // очистить список
      // отредндерить заново
    }
  };

  #renderSort() {
    const sortPresenter = new SortPresenter({
      container: this.#container,
      sortTypeHandler: this.#sortTypesChangeHandler,
      defaultSortType: this.#currentSortType,
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
    this.#sortTypesChangeHandler(this.#currentSortType);
  }

  #sortTypesChangeHandler = (sortType) => {
    // this.#sortPoints(sortType);
    this.#currentSortType = sortType;
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
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
    });

    tripEventPresenter.init(point);
    this.#pointsPresenter.set(point.id, tripEventPresenter);
  };

}
