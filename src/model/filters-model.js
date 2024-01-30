import {FilterTypes} from '../const.js';
import Observable from '../framework/observable.js';

export default class FiltersModel extends Observable {
  #filter = FilterTypes.EVERYTHING;

  get() {
    return this.#filter;
  }

  set(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}
