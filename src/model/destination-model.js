export default class DestinationModel {
  #destinations = [];

  constructor() {
    this.#destinations = [];
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destinations) => destinations.id === id) || null;
  }
}
