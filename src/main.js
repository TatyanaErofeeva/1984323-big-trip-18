import SiteMenuView from './view/site-menu-view .js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const headerMain = document.querySelector('.trip-main');
const tripFilterContainer = headerMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector( '.trip-events' );

const boardPresenter = new RoutePresenter();
const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);

render (new SiteMenuView(), headerMain, RenderPosition.AFTERBEGIN);
render (new FilterView(filters), tripFilterContainer, RenderPosition.AFTERBEGIN);
boardPresenter.init( tripEvents, pointsModel );
