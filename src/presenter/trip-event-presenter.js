import {render, replace, remove} from '../framework/render.js';
import TripEventsItemView from '../view/trip-events-item.js';
import EditPointView from '../view/edit-point.js';

export default class TripEventPresenter {
  #container = null;
  #editPointModel = null;
  #destinationModel = null;
  #offersModel = null;
  #editPoint = null;
  #destination = null;
  #offer = null;
  #offers = null;
  #point = null;
  #pointComponent = null;
  #editComponent = null;
  #handleDataChange = null;

  constructor({container, editPointModel, destinationModel, offersModel, onPointChange}) {
    this.#container = container;
    this.#editPointModel = editPointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onPointChange;
  }

  init(point) {
    this.#point = point;
    this.#editPoint = this.#editPointModel.get()[0];
    this.#destination = this.#destinationModel.getById(this.#editPoint.destination);
    this.#offer = this.#offersModel.getByType(this.#editPoint.type);
    this.#offers = this.#offer.offers;

    const preventPointComponent = this.#pointComponent;
    const preventEditComponent = this.#editComponent;

    this.#pointComponent = new TripEventsItemView({
      point: this.#point,
      onClickRollupBtn: this.#rollupBtnClick,
      onClickFavoriteBtn: this.#favoriteBtnClick,
    });

    this.#editComponent = new EditPointView({
      editPoint: this.#editPoint,
      offers: this.#offers,
      destination: this.#destination,
      onSubmit: this.#closeEditOpenPoint
    });

    if (preventPointComponent === null || preventEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#container.contains(preventPointComponent.element)) {
      replace(this.#pointComponent, preventPointComponent);
    }

    if (this.#container.contains(preventEditComponent.element)) {
      replace(this.#editComponent, preventEditComponent);
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #escKeyEventEdit = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closeEditOpenPoint();
      document.removeEventListener('keydown', this.#escKeyEventEdit);
    }
  };

  #rollupBtnClick = () => {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyEventEdit);
  };

  // Submit

  #closeEditOpenPoint = () => {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyEventEdit);
  };

  #favoriteBtnClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
