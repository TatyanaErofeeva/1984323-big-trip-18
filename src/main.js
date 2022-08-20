import SiteMenuView from './view/site-menu-view .js';
import FilterView from './view/filter-view.js';
import EditFormView from './view/edit-point-form-view.js';
import NewPointForm from './view/create-new-point-form-view.js';
import LookPointInForm from './view/look-point-in-form-view';
import SortView from './view/sort-view.js';
import { render, RenderPosition } from './render.js';

const headerMain = document.querySelector('.trip-main');
const pageMain = document.querySelector('.page-main');
const tripFilterContainer = headerMain.querySelector('.trip-controls__filters');
const tripEventsContainer = pageMain.querySelector('.trip-events');

const init = () => {
  render (new SiteMenuView(), headerMain, RenderPosition.AFTERBEGIN);
  render (new FilterView(), tripFilterContainer, RenderPosition.AFTERBEGIN);
  render (new SortView(), tripEventsContainer, RenderPosition.AFTERBEGIN);
  render (new EditFormView(), tripEventsContainer, RenderPosition.BEFOREEND);
  render (new NewPointForm(), tripEventsContainer, RenderPosition.BEFOREEND);

  for (let i = 1; i <= 3; i++) {
    render(new LookPointInForm(),tripEventsContainer, RenderPosition.BEFOREEND);
  }
};

init();


