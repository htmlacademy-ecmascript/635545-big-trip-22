import {RenderPosition} from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import NewButtonPresenter from './presenter/new-button-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';
import OffersModel from './model/offers-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const eventPointsModel = new EventPointsModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FiltersModel();
const offersModel = new OffersModel();
const newButtonPresenter = new NewButtonPresenter({container: tripMainElement, place: RenderPosition.AFTERBEGIN});
const eventsPresenter = new EventsPresenter({
  container: tripEvents,
  eventPointsModel,
  destinationsModel,
  offersModel,
  filtersModel,
  newButtonPresenter: newButtonPresenter,
});
const filtersPresenter = new FiltersPresenter({
  container: tripControlsFilters,
  pointsModel: eventPointsModel,
  filtersModel: filtersModel,
});

const headerInfoPresenter = new HeaderInfoPresenter({container: tripMainElement, place: RenderPosition.AFTERBEGIN});

export default class BigTripApp {
  init() {
    eventsPresenter.init();
    filtersPresenter.init();
    if(eventPointsModel.get().length) {
      headerInfoPresenter.init();
    }
    newButtonPresenter.init({
      onButtonClick: eventsPresenter.addPointButtonClickHandler
    });
  }
}
