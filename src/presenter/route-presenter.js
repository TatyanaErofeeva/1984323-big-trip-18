import SortView from '../view/sort-view.js';
import EmptyListOfPoints from '../view/no-points-view.js';
import LoadingView from '../view/loading-view.js';
import PointsListView from '../view/points-list-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { sortByPrice, sortByTime, sortByDay } from '../mock/sort.js';
import { FILTER_TYPE, SortData, SortType, UpdateType, UserAction } from '../mock/const.js';
import { filter } from '../mock/filter.js';
import PointNewPresenter from './point-new-presenter.js';
import SiteMenuView from '../view/site-menu-view .js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');


export default class RoutePresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #filterModel = null;
  #menuComponent = null;
  #headerContainer = null;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #tripList = new PointsListView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #currentSortType = SortData[0].id;
  #filterType = FILTER_TYPE.EVERYTHING;
  #isLoading = true;

  init = (headerMain, pointsContainer, pointsModel, filterModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#headerContainer = headerMain;
    this.#pointNewPresenter = new PointNewPresenter(this.#tripList.element, this.#handleViewAction);

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

  #renderSiteMenu = () => {
    this.#menuComponent = new SiteMenuView(this.points, this.#pointsModel);
    render(this.#menuComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #clearRoute = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortData[0].id;
    }
    remove (this.#menuComponent);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripList.element, this.#handleViewAction, this.#handleModeChange, this.#pointsModel);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.points.forEach(( point ) => {
      this.#renderPoint(point);
    });
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointsContainer);
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new EmptyListOfPoints(this.#filterType);
    render( this.#noPointComponent, this.#pointsContainer );
  };

  #renderRoute = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;
    render( this.#tripList, this.#pointsContainer );

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSiteMenu();
    this.#renderSort();
    this.#renderPoints();
  };

  #handleModelEvent = (updateType, data) => {
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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


