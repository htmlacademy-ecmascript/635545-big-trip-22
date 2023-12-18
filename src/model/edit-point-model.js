import {getRandomDestinationMock} from '../mock/destination.js';

const POINT_COUNT = 1;

export default class EditPointModel {

  editPoint = Array.from({length: POINT_COUNT}, getRandomDestinationMock);

  get() {
    return this.editPoint;
  }
}
