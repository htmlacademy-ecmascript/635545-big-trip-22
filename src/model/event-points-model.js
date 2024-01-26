import {eventPointsMock} from '../mock/event-points.js';
import {updatePoint, addPoint, deletePoint} from '../service/mock-service.js';
import {updateItem} from '../utils.js';
import Observable from '../framework/observable.js';

export default class EventPointsModel extends Observable {
  #eventPoints = [];
  #service = null;

  constructor(service) {
    super();
    this.#service = service;
    this.#eventPoints = Array.from(eventPointsMock);
  }

  get() {
    return this.#eventPoints;
  }

  getById(id) {
    return this.#eventPoints.find((eventPoints) => eventPoints.id === id) || null;
  }

  update(updateType, point) {
    const updatedPoint = updatePoint(point);
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  add(updateType, point) {
    const addedPoint = addPoint(point);
    this.#eventPoints = [this.#eventPoints, addedPoint];
    this._notify(updateType, addedPoint);
  }

  delete(updateType, point) {
    deletePoint(point);
    this.#eventPoints = this.#eventPoints.filter((item) => item.id !== point.id);
    this._notify(updateType);
  }
}
