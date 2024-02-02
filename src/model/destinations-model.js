export default class DestinationsModel {
  #destinations = [];
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  async init() {
    this.#destinations = await this.#service.destinations;
    return this.#destinations;
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destinations) => destinations.id === id) || null;
  }
}
