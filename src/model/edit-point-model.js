import {getRandomEventPointsMock} from '../mock/event-points.js';

const POINT_COUNT = 1;

export default class EditPointModel {
  #editPoint = [];

  constructor() {
    this.#editPoint = Array.from({length: POINT_COUNT}, getRandomEventPointsMock);
  }

  get() {
    return this.#editPoint;
  }

  getById(id) {
    return this.#editPoint.find((editPoint) => editPoint.id === id) || null;
  }
}
