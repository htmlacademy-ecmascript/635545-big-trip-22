import {getRandomEventPointsMock} from '../mock/event-points.js';


const POINT_COUNT = 3;

export default class EventPointsModel {
  // #eventPoints = [];

  // constructor() {
  //   this.#eventPoints = [];
  // }

  // get() {
  //   return this.#eventPoints;
  // }

  // getById(id) {
  //   return this.#eventPoints.find((eventPoints) => eventPoints.id === id) || null;
  // }

  tasks = Array.from({length: POINT_COUNT}, getRandomEventPointsMock);

  get() {
    return this.tasks;
  }
}
