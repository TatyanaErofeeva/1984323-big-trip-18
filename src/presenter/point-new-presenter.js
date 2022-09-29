import {render, remove, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-point-form-view.js';
import { UserAction, UpdateType } from '../mock/const.js';
import { nanoid } from 'nanoid';
import { isEscKey } from './point-presenter.js';
import { BLANK_POINT } from '../view/abstract-point-view.js';


export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointNewEditComponent = null;
  #destroyCallback = null;
  #pointsModel = null;

  constructor(pointListContainer, changeData, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#pointsModel = pointsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointNewEditComponent !== null) {
      return;
    }

    this.#pointNewEditComponent = new EditFormView(BLANK_POINT, {
      offers: this.#pointsModel.offers,
      destinations: this.#pointsModel.destinations
    });
    this.#pointNewEditComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#pointNewEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointNewEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointNewEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointNewEditComponent);
    this.#pointNewEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #formSubmitHandler = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...point, id: nanoid()},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)){
      evt.preventDefault();
      this.destroy();
    }
  };
}
