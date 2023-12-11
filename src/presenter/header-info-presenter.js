import {render} from '../render.js';
import HeaderInfoView from '../view/header-info.js';

export default class HeaderInfoPresenter {
  headerInfoComponent = new HeaderInfoView();

  constructor({container, place}) {
    this.container = container;
    this.place = place;
  }

  init() {
    render(this.headerInfoComponent, this.container, this.place);
  }
}
