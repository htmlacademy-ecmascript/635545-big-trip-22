import {eventPointsMock} from '../mock/event-points.js';

export default class EventPointsModel {
  #eventPoints = [];

  constructor() {
    this.#eventPoints = Array.from(eventPointsMock);
  }

  get() {
    return this.#eventPoints;
  }

  getById(id) {
    return this.#eventPoints.find((eventPoints) => eventPoints.id === id) || null;
  }
}
