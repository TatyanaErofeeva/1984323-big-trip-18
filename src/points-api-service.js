import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'is_favorite': point.isFavorite,
      'base_price': point.basePrice,
      'date_from': point.start instanceof Date ? point.dueDate.toISOString() : null,
      'date_to': point.finish instanceof Date ? point.dueDate.toISOString() : null,
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.start;
    delete adaptedPoint.finish;

    return adaptedPoint;
  };
}
