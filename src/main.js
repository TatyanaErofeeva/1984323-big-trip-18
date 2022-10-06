import { render, RenderPosition} from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import FailedLoadPointsView from './view/error-view.js';
import PointsApiService from './services.js/points-api-service.js';

const AUTHORIZATION = 'Basic kTy9gIdsz2313rD';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const headerMain = document.querySelector('.trip-main');
const tripFilterContainer = headerMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector( '.trip-events' );

const boardPresenter = new RoutePresenter();
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel(pointsApiService);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();
const newFailedLoadPoints = new FailedLoadPointsView();

const toggleNewEventButtonState = (type) => {
  newPointButtonComponent.element.disabled = type;
};

const handleNewPointFormClose = () => {
  toggleNewEventButtonState(false);
};

const disableNewEventButton = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  toggleNewEventButtonState(true);
};

boardPresenter.init(headerMain, tripEvents, pointsModel, filterModel);
filterPresenter.init();

toggleNewEventButtonState(true);

pointsModel.init()
  .then(() => {
    toggleNewEventButtonState(false);
  })
 /* .catch(() => {
    render(newFailedLoadPoints, tripEvents, RenderPosition.AFTERBEGIN);
    boardPresenter.removeLoading();
  })*/
  .finally(() => {
    render(newPointButtonComponent, headerMain);
    newPointButtonComponent.setClickHandler(disableNewEventButton);
  });
