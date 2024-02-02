export default class OffersModel {
  #offers = [];
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offers) => offers.type === type) || null;
  }
}
