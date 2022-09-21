import AbstractView from '../framework/view/abstract-view';
import { dateString } from '../mock/util';

const createSiteMenuTemplate = (points) => {
  const lastIndex = points.length - 1;
  const firstPoint = points[0];
  const lastPoint = points[lastIndex];
  const start = firstPoint['dates']['start'];
  const finish = lastPoint['dates']['start'];
  const pointsCost = points.reduce((prev, current) => prev + current.basePrice, 0);

  const offersPrice = () => {
    const offersPointPrice = [];
    points.map((point) =>
      point.offers.map((offers) => {
       console.log(point.offers, point.type.offers);
        if(point.offers === point.type.offers) {
          point.offer.offers.map((offerPointType) =>
            point.offers.map((id) => {
              if(id === offerPointType.id){
                offersPointPrice.push(offerPointType.price);
              }})
          );
        }
      }
      )
    );
    return offersPointPrice;
  };

  const fullTripCost = pointsCost + offersPrice();

  return ( `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${firstPoint.destination.name} &mdash; ${points[1].destination.name} &mdash; ${points[lastIndex].destination.name}</h1>
    <p class="trip-info__dates">${dateString(start, finish)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullTripCost}</span>
  </p>
</section>`);
};

export default class SiteMenuView extends AbstractView {

  #points;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createSiteMenuTemplate(this.#points);
  }
}
