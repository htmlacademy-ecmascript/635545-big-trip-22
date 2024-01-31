import {SourceUrl, Method} from '../const.js';
import ApiService from '../framework/api-service.js';

export default class PointApiService extends ApiService {
  get points() {
    return this._load({url: SourceUrl.POINTS}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: SourceUrl.DESTINATIONS}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: SourceUrl.OFFERS}).then(ApiService.parseResponse);
  }

  async updatePoint (point) {
    const responce = await this._load({
      url: `${SourceUrl.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'content-type': 'application/json'}),
    });

    const parsedResponce = await ApiService.parseResponse(responce);
    return parsedResponce;
  }

  async addPoint (point) {
    const responce = await this._load({
      url: SourceUrl.POINTS,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'content-type': 'application/json'}),
    });

    const parsedResponce = await ApiService.parseResponse(responce);
    return parsedResponce;
  }

  async deletePoint (point) {
    await this._load({
      url: `${SourceUrl.POINTS}/${point.id}`,
      method: Method.DELETE,
    });
  }
}
