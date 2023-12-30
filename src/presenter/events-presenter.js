import {render, replace} from '../framework/render.js';
import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import TripEventsItemView from '../view/trip-events-item.js';
import EditPointView from '../view/edit-point.js';

export default class EventsPresenter {
  #sortComponent = new SortView();
  #tripEventsListComponent = new TripEventsListView();
  #container = null;
  #eventPointsModel = null;
  #editPointModel = null;
  #destinationModel = null;
  #offersModel = null;
  #eventPoints = [];
  #editPoint = null;
  #destination = null;
  #offer = null;
  #offers = null;

  constructor({container, eventPointsModel, editPointModel, destinationModel, offersModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#editPointModel = editPointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.get()];
    this.#editPoint = this.#editPointModel.get()[0];
    this.#destination = this.#destinationModel.getById(this.#editPoint.destination);
    this.#offer = this.#offersModel.getByType(this.#editPoint.type);
    this.#offers = this.#offer.offers;

    render(this.#sortComponent, this.#container);
    render(this.#tripEventsListComponent, this.#container);

    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderPoints(
        this.#eventPoints[i],
        this.#editPoint,
        this.#offers,
        this.#destination
      );
    }
  }

  #renderPoints(points, editPoint, offers, destination) {
    const pointComponent = new TripEventsItemView({
      points,
      onClick: rollupBtnClick
    });

    const editComponent = new EditPointView({
      editPoint,
      offers,
      destination,
      onSubmit: closeEditOpenPoint
    });

    const escKeyEventEdit = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeEditOpenPoint();
        document.removeEventListener('keydown', escKeyEventEdit);
      }
    };

    function rollupBtnClick() {
      replace(editComponent, pointComponent);
      document.addEventListener('keydown', escKeyEventEdit);
    }

    function closeEditOpenPoint() {
      replace(pointComponent, editComponent);
    }

    render(pointComponent, this.#tripEventsListComponent.element);
  }
}
