import {render} from '../framework/render.js';
import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import tripEventPresenter from '../presenter/trip-event-presenter.js';

export default class EventsPresenter {
  #sortComponent = new SortView();
  #tripEventsListComponent = new TripEventsListView();
  #container = null;
  #eventPointsModel = null;
  #editPointModel = null;
  #destinationModel = null;
  #offersModel = null;
  #eventPoints = [];

  constructor({container, eventPointsModel, editPointModel, destinationModel, offersModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#editPointModel = editPointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.get()];

    render(this.#sortComponent, this.#container);
    render(this.#tripEventsListComponent, this.#container);

    for (let i = 0; i < this.#eventPoints.length; i++) {
      new tripEventPresenter({
        container: this.#tripEventsListComponent.element,
        editPointModel: this.#editPointModel,
        destinationModel: this.#destinationModel,
        offersModel: this.#offersModel,
        eventPoint: this.#eventPoints[i],
      }).init();
    }
  }
}
