import {render} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list.js';
import EmptyListView from '../view/empty-list.js';
import TripEventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import {updateItem} from '../utils.js';

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

    new SortPresenter(
      {
        container: this.#container,
      }
    ).init();

    this.#renderList();
  }

  #handleDataChange = (updatePoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatePoint);
    this.#pointsPresenter.get(updatePoint.id).init(updatePoint);
  };

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#container);
  }

  #renderList() {
    render(this.#tripEventsListComponent, this.#container);
    this.#renderPoints();
  }

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
