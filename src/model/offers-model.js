import {offersMock} from '../mock/offers.js';

export default class OffersModel {
  #offers = [];

  constructor() {
    this.#offers = offersMock;
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offers) => offers.type === type) || null;
  }
}
