export default class EventPointsModel {
  #eventPoints = [];

  constructor() {
    this.#eventPoints = [];
  }

  get() {
    return this.#eventPoints;
  }

  getById(id) {
    return this.#eventPoints.find((eventPoints) => eventPoints.id === id) || null;
  }
}
