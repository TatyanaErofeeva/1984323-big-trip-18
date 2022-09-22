import {render, remove, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-point-form-view.js';
import { UserAction, UpdateType } from '../mock/const.js';
import { nanoid } from 'nanoid';
import { isEscKey } from './point-presenter.js';


export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditFormView();
    this.#pointEditComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

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
