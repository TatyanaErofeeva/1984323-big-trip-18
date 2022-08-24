import EditFormView from '../view/edit-point-form-view.js';
import NewPointForm from '../view/create-new-point-form-view.js';
import PointView from '../view/look-point-in-form-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/points-list.js';
import { render, RenderPosition } from '../render.js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');

export default class PointsPresenter {
  pointListContainer = new PointListView();

  init = (pointListContainer, pointsModel) => {
    this.pointListContainer = pointListContainer;
    this.pointsModel = pointsModel;
    this.routePoints = [...this.pointsModel.getPoints()];
    render (new SortView(), tripEventsContainer, RenderPosition.AFTERBEGIN);
    render (new PointListView(), tripEventsContainer, RenderPosition.BEFOREEND);
    render (new EditFormView(this.routePoints[0]), tripEventsContainer, RenderPosition.BEFOREEND);
    render (new NewPointForm(), tripEventsContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.routePoints.length; i++) {
      render(new PointView(this.routePoints[i]),tripEventsContainer, RenderPosition.BEFOREEND);
    }
  };
}
