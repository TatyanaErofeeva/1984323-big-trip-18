import EditFormView from '../view/edit-point-form-view.js';
import PointView from '../view/look-point-in-form-view.js';
import SortView from '../view/sort-view.js';
import PointsAndSortsView from '../view/points-and-sorts-container-view.js';
import EmptyListOfPoints from '../view/no-points-view.js';
import { render, RenderPosition } from '../render.js';
import { KEYS } from '../mock/const.js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');
export default class PointsPresenter {
  #pointsModel = null;
  #pointListContainer = new PointsAndSortsView();
  #routePoints = [];

  init = (pointListContainer, pointsModel) => {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#routePoints = [...this.#pointsModel.points];

    if (this.#routePoints.length === 0) {
      render(new EmptyListOfPoints(), tripEventsContainer, RenderPosition.AFTERBEGIN);
    } else {
      render (new SortView(), tripEventsContainer, RenderPosition.AFTERBEGIN);
      this.#routePoints.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);
    const replaceCardToForm = () => {
      tripEventsContainer.replaceChild(pointEditComponent.element, pointComponent.element);
    };
    const replaceFormToCard = () => {
      tripEventsContainer.replaceChild(pointComponent.element,pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === KEYS.ESCAPE[0] || evt.key === KEYS.ESCAPE[1]) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, tripEventsContainer, RenderPosition.BEFOREEND);
  };
}
