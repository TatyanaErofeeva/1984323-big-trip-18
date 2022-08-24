import SiteMenuView from './view/site-menu-view .js';
import FilterView from './view/filter-view.js';
import { render, RenderPosition } from './render.js';
//import { generatePoint } from './mock/data.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';

const headerMain = document.querySelector('.trip-main');
const tripFilterContainer = headerMain.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const pointsPresenter = new PointsPresenter();

render (new SiteMenuView(), headerMain, RenderPosition.AFTERBEGIN);
render (new FilterView(), tripFilterContainer, RenderPosition.AFTERBEGIN);

pointsPresenter.init(headerMain, pointsModel);
