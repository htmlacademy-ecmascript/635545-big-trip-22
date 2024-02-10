import {remove, render} from '../framework/render.js';
import TripEventsList from '../view/trip-events-list.js';
import EmptyListView from '../view/empty-list.js';
import TripEventPresenter from './trip-event-presenter.js';
import SortPresenter from './sort-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {filter, sorting} from '../utils.js';
import {FilterTypes, SortType, UpdateType, UserAction, TimeLimit} from '../const.js';
import Loading from '../view/loading.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class EventsPresenter {
  #emptyListComponent = null;
  #tripEventsListComponent = new TripEventsList();
  #container = null;
  #eventPointsModel = null;
  #filtersModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sortPresenter = null;
  #newPointPresenter = null;
  #newButtonPresenter = null;
  #isCreating = false;
  #loadingComponent = new Loading();
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({
    container,
    eventPointsModel,
    destinationsModel,
    offersModel,
    filtersModel,
    newButtonPresenter
  }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filtersModel = filtersModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#newPointPresenter = new NewPointPresenter({
      container: this.#tripEventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#addPointDestroyHandler,
    });
    this.#newButtonPresenter = newButtonPresenter;
    this.#eventPointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get eventPoints() {
    const filterType = this.#filtersModel.get();
    const filteredPoints = filter[filterType](this.#eventPointsModel.get());
    return sorting[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderBoard();
  }

  addPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#newButtonPresenter.disabledButton();
    this.#filtersModel.set(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#currentSortType = SortType.DAY;
    this.#newPointPresenter.init();
  };

  #addPointDestroyHandler = ({isCanceled} = {}) => {
    this.#isCreating = false;
    this.#newButtonPresenter.enableButton();
    if(!this.eventPoints.length && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #renderBoard({isError} = {}) {
    if (this.#isLoading) {
      this.#newButtonPresenter.disabledButton();
      this.#renderLoading();
      return;
    }

    if(!this.eventPoints.length && !this.#isCreating && !isError) {
      this.#newButtonPresenter.enableButton();
      this.#renderEmptyList();
      return;
    }

    if(isError) {
      this.#newButtonPresenter.disabledButton();
      this.#renderEmptyList({isError});
      return;
    }

    if (!this.#isCreating) {
      this.#newButtonPresenter.enableButton();
    }


    this.#renderSort();
    this.#renderList();
    this.#renderPoints();
  }

  #renderLoading() {
    render(this.#loadingComponent,this.#container);
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    this.#sortPresenter?.destroy();
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #modelEventHandler = (updateType, data) => {
    if(updateType === UpdateType.PATCH) {
      this.#pointsPresenter.get(data?.id)?.init(data);
    }
    if(updateType === UpdateType.MINOR) {
      this.#clearBoard();
      this.#renderBoard();
    }
    if(updateType === UpdateType.MAJOR) {
      this.#clearBoard({resetSortType: true});
      this.#renderBoard();
    }
    if(updateType === UpdateType.INIT) {
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderBoard();
    }
    if(updateType === UpdateType.ERROR) {
      // this.#clearBoard();
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderBoard({ isError: true });
    }
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#container,
      sortTypeHandler: this.#sortTypesChangeHandler,
      defaultSortType: SortType.DAY,
    });
    this.#sortPresenter.init();
  }

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    this.#newPointPresenter.destroy();
  };

  #handleViewAction = async (actionType, updateType, update, replaceEditorToPoint) => {
    this.#uiBlocker.block();
    if(actionType === UserAction.UPDATE_POINT) {
      this.#pointsPresenter.get(update.id).setSaving();
      try {
        await this.#eventPointsModel.update(updateType, update);
        if (replaceEditorToPoint) {
          replaceEditorToPoint();
        }
      } catch (error) {
        this.#pointsPresenter.get(update.id).setAborting();
      }
    }

    if(actionType === UserAction.CREATE_POINT) {
      this.#newPointPresenter.setSaving();
      try {
        await this.#eventPointsModel.add(updateType, update);
      } catch (error) {
        this.#newPointPresenter.setAborting();
      }
    }

    if(actionType === UserAction.DELETE_POINT) {
      const deletePresenter = this.#pointsPresenter.get(update.id);
      deletePresenter.setDeleting();
      try {
        // deletePresenter.setDeleting();
        await this.#eventPointsModel.delete(updateType, update);
      } catch (error) {
        deletePresenter.setAborting();
      }
    }
    this.#uiBlocker.unblock();
  };

  #renderEmptyList({isError} = {}) {
    this.#emptyListComponent = new EmptyListView({
      filterType: this.#filtersModel.get(),
      isError: isError,
    });
    render(this.#emptyListComponent, this.#container);
  }

  #renderList() {
    render(this.#tripEventsListComponent, this.#container);
  }

  #sortTypesChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => {
      presenter.resetView();
    });
    this.#newPointPresenter.destroy();
  };

  #renderPoints() {
    this.eventPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const tripEventPresenter = new TripEventPresenter({
      container: this.#tripEventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    tripEventPresenter.init(point);
    this.#pointsPresenter.set(point.id, tripEventPresenter);
  };

}
