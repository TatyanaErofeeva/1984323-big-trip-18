import SiteMenuView from './view/site-menu-view .js';
import { render, RenderPosition } from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const headerMain = document.querySelector('.trip-main');
const tripFilterContainer = headerMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector( '.trip-events' );

const boardPresenter = new RoutePresenter();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  RoutePresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render (new SiteMenuView(), headerMain, RenderPosition.AFTERBEGIN);
render (newPointButtonComponent, headerMain);

newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
boardPresenter.init( tripEvents, pointsModel, filterModel);
filterPresenter.init();
