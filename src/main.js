import { render} from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './services.js/points-api-service.js';
import DestinationApiService from './services.js/destinations-api-service.js';
import OffersApiService from './services.js/offers-api-service.js';

const AUTHORIZATION = 'Basic kTy9gIdsz2313rD';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const headerMain = document.querySelector('.trip-main');
const tripFilterContainer = headerMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector( '.trip-events' );

const boardPresenter = new RoutePresenter();
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const destinationApiService = new DestinationApiService(END_POINT, AUTHORIZATION);
const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel(pointsApiService, destinationApiService, offersApiService);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

boardPresenter.init(headerMain, tripEvents, pointsModel, filterModel);
filterPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, headerMain);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
