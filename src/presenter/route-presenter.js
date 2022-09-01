import SortView from '../view/sort-view.js';
import EmptyListOfPoints from '../view/no-points-view.js';
import PointsListView from '../view/points-list-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../mock/util.js';
import { sortByPrice, sortByTime, sortByDay } from '../mock/sort.js';
import { SortData } from '../mock/const.js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');

export default class RoutePresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #routePoints = [];
  #pointPresenter = new Map();
  #tripList = new PointsListView();
  #sortComponent = new SortView(SortData);
  #noPointComponent = new EmptyListOfPoints;
  #sourcedPointsList = [];

  init = ( pointsContainer, pointsModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#routePoints = [...this.#pointsModel.points];
    this.#sourcedPointsList = [...this.#pointsModel.points].sort(sortByDay);

    this.#renderRoute();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedPoint);
    this.#sourcedPointsList = updateItem(this.#sourcedPointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSort = () => {
    render( this.#sortComponent, tripEventsContainer, RenderPosition.AFTERBEGIN );
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #sortPoints = (sortType) => {
    if ( sortType === 'sort-time' ) {
      return this.#routePoints.sort(sortByTime);
    }

    if ( sortType === 'sort-day' ) {
      return this.#routePoints.sort(sortByDay);
    }

    if ( sortType === 'sort-price' ) {
      return this.#routePoints.sort(sortByPrice);
    }

    //this.#currentSortType = sortType;
  };

  #renderPoints = () =>{
    this.#routePoints.forEach(( point ) => {
      this.#renderPoint( point );
    });
  };

  #renderNoPoints = () => {
    render( this.#noPointComponent, this.#pointsContainer );
  };

  #renderRoute = () => {
    render( this.#tripList, this.#pointsContainer );

    if (this.#routePoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  };
}
