import {render, replace, remove} from '../framework/render.js';
import TripEventsItem from '../view/trip-events-item.js';
import EditPointView from '../view/edit-point.js';
import {EditType, Mode, UpdateType, UserAction} from '../const.js';
import { isMinorChange } from '../utils.js';

export default class TripEventPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #editPoint = null;
  #destination = null;
  #offer = null;
  #offers = null;
  #point = null;
  #pointComponent = null;
  #editComponent = null;
  #handleDataChange = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onPointChange,
    onModeChange
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    this.#editPoint = this.#point;
    this.#destination = this.#destinationsModel.getById(this.#editPoint.destination);
    this.#offer = this.#offersModel.getByType(this.#editPoint.type);
    this.#offers = this.#offer.offers;

    const preventPointComponent = this.#pointComponent;
    const preventEditComponent = this.#editComponent;

    this.#pointComponent = new TripEventsItem({
      point: this.#point,
      destination: this.#destination,
      allOffers: this.#offersModel.get(),
      onClickRollupBtn: this.#rollupBtnClick,
      onClickFavoriteBtn: this.#favoriteBtnClick,
    });

    this.#editComponent = new EditPointView({
      editPoint: this.#editPoint,
      allDestinations: this.#destinationsModel.get(),
      allOffers: this.#offersModel.get(),
      onSubmit: this.#closeAndSaveEditOpenPoint,
      onClose: this.#closeEditOpenPoint,
      onDelete: this.#deleteClickHandler,
      editorMode: EditType.EDITING,
    });

    if (!preventPointComponent || !preventEditComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, preventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editComponent, preventEditComponent);
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #deleteClickHandler = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #escKeyEventEdit = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      // this.#editComponent.resetState();
      this.#closeEditOpenPoint();
      document.removeEventListener('keydown', this.#escKeyEventEdit);
    }
  };

  #rollupBtnClick = () => {
    this.#replacePointToEditor();
    document.addEventListener('keydown', this.#escKeyEventEdit);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditorToPoint();
      // Проблемный момент с заменой включенной
      // this.#editComponent.resetState();
    }
  };

  #replaceEditorToPoint = () => {
    document.removeEventListener('keydown', this.#escKeyEventEdit);
    replace(this.#pointComponent, this.#editComponent);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToEditor = () => {
    replace(this.#editComponent, this.#pointComponent);
    // Возможно не нужно
    document.addEventListener('keydown', this.#escKeyEventEdit);
    this.#handleModeChange();
    this.#editComponent.resetState();
    this.#mode = Mode.EDITING;
  };

  // Close

  #closeEditOpenPoint = () => {
    this.#replaceEditorToPoint();
    // document.removeEventListener('keydown', this.#escKeyEventEdit);
  };

  // Submit

  #closeAndSaveEditOpenPoint = (point) => {
    const currentTypeChange = isMinorChange(point, this.#point) ? UpdateType.MINOR : UpdateType.PATCH;
    this.#handleDataChange(UserAction.UPDATE_POINT, currentTypeChange, point, this.#replaceEditorToPoint);
    // this.#replaceEditorToPoint();
    // возможно следует поменять местами...
    // document.removeEventListener('keydown', this.#escKeyEventEdit);
  };

  #favoriteBtnClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      }
    );
  };

  setSaving = () => {
    if(this.#mode === Mode.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setAborting = () => {
    if(this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    if(this.#mode === Mode.EDITING) {
      const resetState = () => {
        this.#editComponent.resetState();
      };
      this.#editComponent.shake(resetState);
    }
  };

  setDeleting = () => {
    if(this.#mode === Mode.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };
}
