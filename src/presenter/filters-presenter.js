import {render} from '../render.js';
import FiltersView from '../view/filters.js';

export default class FiltersPresenter {
  filterComponent = new FiltersView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.filterComponent, this.container);
  }
}
