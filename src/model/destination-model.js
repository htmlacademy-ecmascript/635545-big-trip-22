import {destinationMock} from '../mock/destination.js';

// const POINT_COUNT = 1;

export default class DestinationModel {
  #destinations = [];

  constructor() {
    this.#destinations = destinationMock;
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destinations) => destinations.id === id) || null;
  }
}
