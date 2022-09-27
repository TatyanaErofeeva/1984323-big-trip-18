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

  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' })
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
    console.log({point});

    const adaptedPoint = Object.assign(
      point, {
        'base_price': Number(point.basePrice),
        'date_from': new Date(point.dates.start).toISOString(),
        'date_to': new Date(point.dates.finish).toISOString(),
        destination: point.destination.id,
        type: point.type.name.toLowerCase(),
        offers: point.offers.map((pointOffer) => point.type.offers.find((typeOfferElem) => typeOfferElem.title === pointOffer).id),
        'is_favorite': point.isFavorite,
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dates;
    delete adaptedPoint.pointsModel;

    console.log(adaptedPoint);
    return adaptedPoint;
  };
}
