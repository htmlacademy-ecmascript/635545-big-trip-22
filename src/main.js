import {RenderPosition} from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import EditPointModel from './model/edit-point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const eventPointsModel = new EventPointsModel();
const editPointModel = new EditPointModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const eventsPresenter = new EventsPresenter({
  container: tripEvents,
  eventPointsModel,
  editPointModel,
  destinationModel,
  offersModel
});
const filtersPresenter = new FiltersPresenter({container: tripControlsFilters});
const headerInfoPresenter = new HeaderInfoPresenter({container: tripMainElement, place: RenderPosition.AFTERBEGIN});

eventsPresenter.init();
filtersPresenter.init();
headerInfoPresenter.init();
