import {RenderPosition} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import EventPointsModel from './model/event-points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const eventPointsModel = new EventPointsModel();
const eventsPresenter = new EventsPresenter({
  container: tripEvents,
  eventPointsModel
});
const filtersPresenter = new FiltersPresenter({container: tripControlsFilters});
const headerInfoPresenter = new HeaderInfoPresenter({container: tripMainElement, place: RenderPosition.AFTERBEGIN});

eventsPresenter.init();
filtersPresenter.init();
headerInfoPresenter.init();
