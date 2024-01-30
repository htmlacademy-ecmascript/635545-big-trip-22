import {RenderPosition, remove, render} from '../framework/render.js';
import EditPointView from '../view/edit-point.js';
import {EditType, UpdateType, UserAction} from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #destinationModel = [];
  #offersModel = [];
  #addPointComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor ({
    container,
    destinationModel,
    offersModel,
    onDataChange,
    onDestroy
  }) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addPointComponent !== null) {
      return;
    }

    this.#addPointComponent = new EditPointView({
      arrDestinations: this.#destinationModel.get(),
      arrOffers: this.#offersModel.get(),
      onSubmit: this.#formSubmitHandler,
      onClose: this.#cancelClickHandler,
      editorMode: EditType.CREATING,
    });

    render(this.#addPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyEventEdit);
  }

  destroy({isCanceled = true}) {
    if (!this.#addPointComponent) {
      return;
    }
    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    this.#handleDestroy({isCanceled});
    document.removeEventListener('keydown', this.#escKeyEventEdit);
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
    this.destroy({isCanceled: false});
  };

  #escKeyEventEdit = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy({isCanceled: true});
    }
  };
}
