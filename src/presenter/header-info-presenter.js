import {render, replace, remove} from '../framework/render.js';
import HeaderInfoView from '../view/header-info.js';

export default class HeaderInfoPresenter {
  #headerInfoComponent = null;
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #place = null;

  constructor({container, pointsModel, destinationsModel, offersModel, place}) {
    this.#container = container;
    this.#place = place;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevHeaderInfoComponent = this.#headerInfoComponent;
    this.#headerInfoComponent = new HeaderInfoView({
      points: this.#pointsModel.get(),
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
    });
    if(!prevHeaderInfoComponent) {
      render(this.#headerInfoComponent, this.#container, this.#place);
      return;
    }
    replace(this.#headerInfoComponent, prevHeaderInfoComponent);
    remove(prevHeaderInfoComponent);
    render(this.#headerInfoComponent, this.#container, this.#place);
  }

  #modelEventHandler = () => {
    this.init();
  };
}
