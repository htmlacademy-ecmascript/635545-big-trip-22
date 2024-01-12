import {render} from '../framework/render.js';
import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import TripEventPresenter from '../presenter/trip-event-presenter.js';
import {updateItem} from '../utils.js';

export default class EventsPresenter {
  #sortComponent = new SortView();
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
  }

  init() {
    this.#renderSort();
    this.#renderList();
  }

  #handleDataChange = (updatePoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatePoint);
    this.#pointsPresenter.get(updatePoint.id).init(updatePoint);
  };

  #renderSort() {
    render(this.#sortComponent, this.#container);
  }

  #renderList() {
    render(this.#tripEventsListComponent, this.#container);
    this.#renderPoints();
  }

  #renderPoints() {
    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #resetPoint = () => {
    console.log('надо сбрасывать');
  };

  #renderPoint = (point) => {
    const tripEventPresenter = new TripEventPresenter({
      container: this.#tripEventsListComponent.element,
      editPointModel: this.#editPointModel,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleDataChange,
    });

    tripEventPresenter.init(point);
    this.#pointsPresenter.set(point.id, tripEventPresenter);
  };

}
