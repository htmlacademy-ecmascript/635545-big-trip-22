import {render, replace, remove} from '../framework/render.js';
import HeaderInfoView from '../view/header-info.js';

export default class HeaderInfoPresenter {
  #headerInfoComponent = null;
  #container = null;
  #place = null;

  constructor({container, place}) {
    this.#container = container;
    this.#place = place;
  }

  init() {
    const prevHeaderInfoComponent = this.#headerInfoComponent;
    this.#headerInfoComponent = new HeaderInfoView();
    if(!prevHeaderInfoComponent) {
      render(this.#headerInfoComponent, this.#container, this.#place);
      return;
    }
    replace(this.#headerInfoComponent, prevHeaderInfoComponent);
    remove(prevHeaderInfoComponent);
    render(this.#headerInfoComponent, this.#container);
  }
}
