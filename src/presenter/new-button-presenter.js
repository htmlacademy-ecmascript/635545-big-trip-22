import {render} from '../framework/render.js';
import NewButtonView from '../view/new-button.js';

export default class NewButtonPresenter {
  #container = null;
  #buttonComponent = null;
  #handleButtonClick = null;

  constructor ({container}) {
    this.#container = container;
  }

  init({onButtonClick}) {
    this.#handleButtonClick = onButtonClick;
    this.#buttonComponent = new NewButtonView({
      onClick: this.#buttonClickHandler,
    });

    render(this.#buttonComponent, this.#container);
  }

  disabledButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}
