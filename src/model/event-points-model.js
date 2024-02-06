import {updateItem, adaptToClient, adaptToServer} from '../utils.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventPointsModel extends Observable {
  #eventPoints = [];
  #service = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({service, destinationsModel, offersModel}) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  async init() {
    try {
      await Promise.all(
        [this.#destinationsModel.init()],
        this.#offersModel.init()
      );

      const points = await this.#service.points;
      this.#eventPoints = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {isError: false});
    } catch (error) {
      this.#eventPoints = [];
      this._notify(UpdateType.ERROR, {isError: true});
    }
  }

  get () {
    return this.#eventPoints;
  }

  getById(id) {
    return this.#eventPoints.find((eventPoints) => eventPoints.id === id) || null;
  }

  async update(updateType, point) {
    try {
      const updatedPoint = await this.#service.updatePoint(
        adaptToServer(point)
      );
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#eventPoints = updateItem(this.#eventPoints, adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch (error) {
      // this._notify(UpdateType.ERROR, {isError: true});
      throw new Error('Update fall');
    }
  }

  async add(updateType, point) {
    try {
      const addedPoint = await this.#service.addPoint(
        adaptToServer(point)
      );
      const adaptedPoint = adaptToClient(addedPoint);
      this.#eventPoints.push(adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch (error) {
      // this._notify(UpdateType.ERROR, {isError: true});
      throw new Error('Add fall');
    }
  }

  async delete(updateType, point) {
    try {
      await this.#service.deletePoint(point);
      this.#eventPoints = this.#eventPoints.filter((item) => item.id !== point.id);
      this._notify(updateType);
    } catch (error) {
      // this._notify(UpdateType.ERROR, {isError: true});
      throw new Error('Delete fall');
    }
  }
}
