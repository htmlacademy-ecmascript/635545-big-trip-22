export default class OffersModel {
  #offers = [];

  constructor() {
    this.#offers = [];
  }

  get() {
    return this.#offers;
  }

  getById(id) {
    return this.#offers.find((offers) => offers.id === id) || null;
  }
}
