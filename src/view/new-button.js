import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createNewButtonTemplate() {
  return (
    `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
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
    console.log(this.#isDisabled);
    return createNewButtonTemplate();
  }

  setDisabled(isDisabled) {
    this.#isDisabled = isDisabled;
    console.log('setDisabled' , this.#isDisabled);
    this.element.disabled = isDisabled;
  }

  #eventAddButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
