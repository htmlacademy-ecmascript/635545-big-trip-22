import {RenderPosition} from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const eventPointsModel = new EventPointsModel();
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const eventsPresenter = new EventsPresenter({
  container: tripEvents,
  eventPointsModel,
  destinationModel,
  offersModel,
  filterModel
});
const filtersPresenter = new FiltersPresenter({
  container: tripControlsFilters,
  pointsModel: eventPointsModel,
});
const headerInfoPresenter = new HeaderInfoPresenter({container: tripMainElement, place: RenderPosition.AFTERBEGIN});

export default class BigTripApp {
  init() {
    eventsPresenter.init();
    filtersPresenter.init();
    if(eventPointsModel.get().length) {
      headerInfoPresenter.init();
    }
  }
}
