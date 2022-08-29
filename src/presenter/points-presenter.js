import EditFormView from '../view/edit-point-form-view.js';
import PointView from '../view/look-point-in-form-view.js';
import SortView from '../view/sort-view.js';
import EmptyListOfPoints from '../view/no-points-view.js';
import PointsListView from '../view/points-list-view.js';
import {render, RenderPosition, replace} from '../framework/render.js';
import { KEYS } from '../mock/const.js';

const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');
export default class PointsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #routePoints = [];
  #tripList = new PointsListView();

  init = ( pointsContainer, pointsModel ) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#routePoints = [...this.#pointsModel.points];

    if ( this.#routePoints.length === 0 ) {
      return render( new EmptyListOfPoints(), this.#pointsContainer );
    }

    render( new SortView(), tripEventsContainer, RenderPosition.AFTERBEGIN );
    render( this.#tripList, this.#pointsContainer );

    this.#routePoints.forEach(( point ) => {
      this.#renderPoint( point );
    });
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent,pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === KEYS.ESCAPE[0] || evt.key === KEYS.ESCAPE[1]) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditFormClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#tripList.element);
  };
}
