import {remove, render} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list.js';
import EmptyListView from '../view/empty-list.js';
import TripEventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {filter, sorting, updateItem} from '../utils.js';
import { SortTypes, UpdateType, UserAction } from '../const.js';

export default class EventsPresenter {
  // #emptyListComponent = new EmptyListView();
  #emptyListComponent = null;
  #tripEventsListComponent = new TripEventsListView();
  #container = null;
  #eventPointsModel = null;
  #filtersModel = null;
  #destinationModel = null;
  #offersModel = null;
  // #eventPoints = [];
  #pointsPresenter = new Map();
  #currentSortType = SortTypes.DAY;
  #sortPresenter = null;
  #newPointPresenter = null;
  #newButtonPresenter = null;
  #isCreating = false;

  constructor({
    container,
    eventPointsModel,
    destinationModel,
    offersModel,
    filtersModel,
    newButtonPresenter
  }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filtersModel = filtersModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#newPointPresenter = new NewPointPresenter({
      container: this.#container,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#addPointDestroyHandler,
    });
    this.#newButtonPresenter = newButtonPresenter;
    // this.#eventPoints = [...this.#eventPointsModel.get()];
    // Для пустого листа this.#eventPoints = [];
    this.#eventPointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get eventPoints() {
    const filterType = this.#filtersModel.get();
    const filteredPoints = filter[filterType](this.#eventPointsModel.get());
    return sorting[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderBoard();
  }

  addPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#newButtonPresenter.disabledButton();
    this.#newPointPresenter.init();
  };

  #addPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newButtonPresenter.enableButton();
    if(!this.#pointsPresenter.length && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #renderBoard() {
    if(!this.eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderList();
    // this.#renderPoints();
    // сломалась редактирование
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    this.#sortPresenter.destroy();
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #modelEventHandler = (updateType, data) => {
    if(updateType === UpdateType.PATCH) {
      this.#pointsPresenter.get(data?.id)?.init(data);
    }
    if(updateType === UpdateType.MINOR) {
      this.#clearBoard();
      this.#renderBoard();
    }
    if(updateType === UpdateType.MAJOR) {
      this.#clearBoard({resetSortType: true});
      this.#renderBoard();
    }
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#container,
      sortTypeHandler: this.#sortTypesChangeHandler,
      // defaultSortType: this.#currentSortType,
    });
    this.#sortPresenter.init();
  }

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #handleViewAction = (actionType, updateType, update) => {
    if(actionType === UserAction.UPDATE_POINT) {
      this.#eventPointsModel.update(updateType, update);
    }

    if(actionType === UserAction.CREATE_POINT) {
      this.#eventPointsModel.add(updateType, update);
    }

    if(actionType === UserAction.DELETE_POINT) {
      this.#eventPointsModel.delete(updateType, update);
    }
  };

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyListView({filterType: this.#filtersModel.get()});
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
    this.eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const tripEventPresenter = new TripEventPresenter({
      container: this.#tripEventsListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    tripEventPresenter.init(point);
    this.#pointsPresenter.set(point.id, tripEventPresenter);
  };

}
