import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListText} from '../const.js';

function createEmptyListTemplate({text}) {
  return (
    `
      <p class="trip-events__msg">${text}</p>
    `
  );
}

export default class EmptyListView extends AbstractView {
  #filterType = null;
  #isError = false;

  constructor ({filterType, isError}) {
    super();
    this.#filterType = filterType;
    this.#isError = isError;
  }

  get template() {
    if (this.#isError) {
      return createEmptyListTemplate({text: EmptyListText.ERROR});
    }
    return createEmptyListTemplate({text: EmptyListText[this.#filterType.toUpperCase()]});
  }
}
