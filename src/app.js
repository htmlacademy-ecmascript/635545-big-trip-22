import {RenderPosition} from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import NewButtonPresenter from './presenter/new-button-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';
import OffersModel from './model/offers-model.js';
import PointsApiService from './service/points-api-service.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const AUTHORIZATION = 'Basic doghdtshr6dhsge6';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const eventPointsModel = new EventPointsModel({
  service: pointsApiService,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
const filtersModel = new FiltersModel();

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
    newButtonPresenter.init({
      onButtonClick: eventsPresenter.addPointButtonClickHandler
    });
    eventsPresenter.init();
    filtersPresenter.init();
    if(eventPointsModel.get().length) {
      headerInfoPresenter.init();
    }
    eventPointsModel.init();
  }
}
