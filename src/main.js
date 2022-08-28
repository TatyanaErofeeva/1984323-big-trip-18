import SiteMenuView from './view/site-menu-view .js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './render.js';
import BoardPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';

const headerMain = document.querySelector('.trip-main');
const tripFilterContainer = headerMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector( '.trip-events' );

const boardPresenter = new BoardPresenter();
const pointsModel = new PointsModel();
render (new SiteMenuView(), headerMain, RenderPosition.AFTERBEGIN);
render (new FilterView(), tripFilterContainer, RenderPosition.AFTERBEGIN);
boardPresenter.init( tripEvents, pointsModel );
