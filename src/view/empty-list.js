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

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate({text: EmptyListText[this.#filterType.toUpperCase()]});
  }
}
