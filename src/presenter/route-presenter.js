import SortView from '../view/sort-view.js';
import EmptyListOfPoints from '../view/no-points-view.js';
import PointsListView from '../view/points-list-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { sortByPrice, sortByTime, sortByDay } from '../mock/sort.js';
import { FILTER_TYPE, SortData, SortType, UpdateType, UserAction } from '../mock/const.js';
import { filter } from '../mock/data.js';
import PointNewPresenter from './point-new-presenter.js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');

export default class RoutePresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #filterModel = null;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #tripList = new PointsListView();
  #noPointComponent = null;
  #currentSortType = SortData[0].id;
  #filterType = FILTER_TYPE.EVERYTHING;
  //#sortComponent = new SortView();

  init = (pointsContainer, pointsModel, filterModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(pointsContainer, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderRoute();
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    if ( this.#currentSortType === SortType.TIME ) {
      return filteredPoints.sort(sortByTime);
    }

    if ( this.#currentSortType === SortType.DAY ) {
      return filteredPoints.sort(sortByDay);
    }

    if ( this.#currentSortType === SortType.PRICE ) {
      return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  createPoint = (callback) => {
    this.#currentSortType = SortData[0].id;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(SortData, this.#currentSortType);
    render( this.#sortComponent, tripEventsContainer, RenderPosition.AFTERBEGIN );
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearRoute = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortData[0].id;
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripList.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () =>{
    this.points.forEach(( point ) => {
      this.#renderPoint(point);
    });
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new EmptyListOfPoints(this.#filterType);
    render( this.#noPointComponent, this.#pointsContainer );
  };

  #renderRoute = () => {
    const points = this.points;
    const pointsCount = points.length;
    render( this.#tripList, this.#pointsContainer );

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearRoute({resetSortType: true});
        this.#renderRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearRoute({resetSortType: true});
        this.#renderRoute();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearRoute();
    this.#renderRoute();
  };
}
