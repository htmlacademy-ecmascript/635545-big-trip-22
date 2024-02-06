import AbstractView from '../framework/view/abstract-view.js';

function createNewButtonTemplate() {
  return (
    `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `
  );
}

export default class NewButtonView extends AbstractView {
  #handleClick = null;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click' , this.#eventAddButtonClickHandler);
  }

  get template() {
    return createNewButtonTemplate();
  }

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }

  #eventAddButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
