import AbstractView from '../framework/view/abstract-view';

const createErrorTemplate = () => (
  '<p class="trip-events__err">Failed to load points, please try again later</p>'
);
export default class FailedLoadPointsView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createErrorTemplate();
  }
}
