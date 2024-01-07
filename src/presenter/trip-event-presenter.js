import {render, replace} from '../framework/render.js';
import TripEventsItemView from '../view/trip-events-item.js';
import EditPointView from '../view/edit-point.js';

export default class tripEventPresenter {
  #container = null;
  #editPointModel = null;
  #destinationModel = null;
  #offersModel = null;
  #editPoint = null;
  #destination = null;
  #offer = null;
  #offers = null;
  #eventPoint = null;

  constructor({container, editPointModel, destinationModel, offersModel, eventPoint}) {
    this.#container = container;
    this.#editPointModel = editPointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#eventPoint = eventPoint;
  }

  init() {
    this.#editPoint = this.#editPointModel.get()[0];
    this.#destination = this.#destinationModel.getById(this.#editPoint.destination);
    this.#offer = this.#offersModel.getByType(this.#editPoint.type);
    this.#offers = this.#offer.offers;

    const pointComponent = new TripEventsItemView({
      points: this.#eventPoint,
      onClick: rollupBtnClick
    });

    const editComponent = new EditPointView({
      editPoint: this.#editPoint,
      offers: this.#offers,
      destination: this.#destination,
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

    render(pointComponent, this.#container);
  }
}
