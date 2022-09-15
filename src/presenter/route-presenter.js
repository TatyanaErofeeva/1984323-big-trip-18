import SortView from '../view/sort-view.js';
import EmptyListOfPoints from '../view/no-points-view.js';
import PointsListView from '../view/points-list-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { sortByPrice, sortByTime, sortByDay } from '../mock/sort.js';
import { FILTER_TYPE, SortData, SortType, UpdateType, UserAction } from '../mock/const.js';
import { filter } from '../mock/data.js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');

export default class RoutePresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #filterModel = null;
  #pointPresenter = new Map();
  #tripList = new PointsListView();
  #noPointComponent = null;
  #currentSortType = SortData[0];
  #filterType = FILTER_TYPE.EVERYTHING;

  init = (pointsContainer, pointsModel, filterModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel = filterModel;
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

  /*createPoint = () => {
    this.#currentSortType = SortData[0];
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPE.EVERYTHING);
  };*/

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
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

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearRoute();
        this.#renderRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearRoute({resetSortType: true});
        this.#renderRoute();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearRoute();
    this.#renderRoute();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(SortData);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render( this.#sortComponent, tripEventsContainer, RenderPosition.AFTERBEGIN );

  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripList.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearRoute = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortData[0];
    }
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

    if (pointsCount.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  };
}
