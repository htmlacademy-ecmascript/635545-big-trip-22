import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createNewButtonTemplate(isDisabled) {
  return (
    `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isDisabled ? 'disabled' : ''}>New event</button>
    `
  );
}

export default class NewButtonView extends AbstractStatefulView {
  #handleClick = null;
  #isDisabled = false;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click' , this.#eventAddButtonClickHandler);
  }

  get template() {
    return createNewButtonTemplate(this.#isDisabled);
  }

  setDisabled(isDisabled) {
    this.#isDisabled = isDisabled;
    this.element.disabled = isDisabled;
  }

  #eventAddButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
