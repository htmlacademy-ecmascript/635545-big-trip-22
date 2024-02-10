import {RenderPosition, remove, render} from '../framework/render.js';
import EditPoint from '../view/edit-point.js';
import {EditType, UpdateType, UserAction} from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #destinationsModel = [];
  #offersModel = [];
  #addPointComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor ({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onDestroy
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addPointComponent !== null) {
      return;
    }

    this.#addPointComponent = new EditPoint({
      allDestinations: this.#destinationsModel.get(),
      allOffers: this.#offersModel.get(),
      onSubmit: this.#formSubmitHandler,
      onClose: this.#cancelClickHandler,
      editorMode: EditType.CREATING,
    });

    render(this.#addPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#eventEditEscKeyHandler);
  }

  destroy({isCanceled = true} = {}) {
    if (!this.#addPointComponent) {
      return;
    }
    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    // this.#handleDestroy({isCanceled});
    document.removeEventListener('keydown', this.#eventEditEscKeyHandler);
    this.#handleDestroy({isCanceled});
  }

  #cancelClickHandler = () => {
    this.destroy({isCanceled: true});
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(
      UserAction.CREATE_POINT,
      UpdateType.MINOR,
      point
    );
    document.removeEventListener('keydown', this.#eventEditEscKeyHandler);
  };

  #eventEditEscKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy({isCanceled: true});
    }
  };

  setSaving = () => {
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    document.addEventListener('keydown', this.#eventEditEscKeyHandler);
    this.#addPointComponent.shake(resetFormState);
  };
}
