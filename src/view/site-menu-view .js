import AbstractPointView from './abstract-point-view.js';
import { dateString } from '../utils/date.js';

const createSiteMenuTemplate = (points, types) => {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const start = firstPoint.dates.start;
  const finish = lastPoint.dates.start;
  const pointsCost = points.reduce((prev, current) => prev + current.basePrice, 0);
  const acc = [];
  types.map(({offers}) => offers)
    .forEach((offer) =>
      offer.forEach((obj) => acc.push(obj)));
  const calcOffersPrice = () => {
    let offersPointPrice = 0;
    points.forEach((point) =>
      point.offers.forEach((offerElem) => {
        if (point.offers.length > 0){
          offersPointPrice += acc.find((offer) => offer.id === offerElem).price;
        }
      })
    );

    return offersPointPrice;
  };
  const fullTripCost = pointsCost + calcOffersPrice();
  const getDestinationString = () => {
    let str = '';
    if (points.length > 3) {
      str = `${points[0].destination.name} &mdash; . . . &mdash; ${points[points.length - 1].destination.name}`;
    } else if (points.length === 3) {
      str = `${points[0].destination.name} &mdash; ${points[1].destination.name} &mdash; ${points[2].destination.name}`;
    } else if (points.length === 2) {
      str = `${points[0].destination.name} &mdash; ${points[1].destination.name}`;
    } else if (points.length === 1) {
      str = `${points[0].destination.name}`;
    }
    return str;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">
           ${getDestinationString(points)}
         </h1>
         <p class="trip-info__dates">
           ${dateString(start, finish)}
         </p>
       </div>
       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">
         ${fullTripCost}
         </span>
       </p>
    </section>`);
};

export default class SiteMenuView extends AbstractPointView {
  #points;

  constructor(points, {offers, destinations}) {
    super({offers, destinations});
    this.#points = points;
  }

  get template() {
    return createSiteMenuTemplate(this.#points,this.offers, this.destinations);
  }
}
