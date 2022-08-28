import EditFormView from '../view/edit-point-form-view.js';
import PointView from '../view/look-point-in-form-view.js';
import SortView from '../view/sort-view.js';
import EmptyListOfPoints from '../view/no-points-view.js';
import PointsListView from '../view/points-list-view.js';
import { render, RenderPosition } from '../render.js';
import { KEYS } from '../mock/const.js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');
export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #tripList = new PointsListView();

  init = ( boardContainer, pointsModel ) => {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    if ( this.#boardPoints.length === 0 ) {
      return render( new EmptyListOfPoints(), this.#boardContainer );
    }

    render( new SortView(), tripEventsContainer, RenderPosition.AFTERBEGIN );
    render( this.#tripList, this.#boardContainer );

    this.#boardPoints.forEach(( point ) => {
      this.#renderPoint( point );
    });
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);
    const replaceCardToForm = () => {
      this.#tripList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };
    const replaceFormToCard = () => {
      this.#tripList.element.replaceChild(pointComponent.element,pointEditComponent.element);
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

    render(pointComponent, this.#tripList.element);
  };
}
