import {render} from '../render.js';
import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import TripEventsItemView from '../view/trip-events-item.js';
import NewPointView from '../view/new-point.js';
import EditPointView from '../view/edit-point.js';

export default class EventsPresenter {
  sortComponent = new SortView();
  tripEventsListComponent = new TripEventsListView();

  constructor({container, eventPointsModel, editPointModel, destinationModel, offersModel}) {
    this.container = container;
    this.eventPointsModel = eventPointsModel;
    this.editPointModel = editPointModel;
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
  }

  init() {
    this.eventPoints = [...this.eventPointsModel.get()];
    this.editPoint = this.editPointModel.get()[0];
    this.destination = this.destinationModel.getById(this.editPoint.destination);
    this.offer = this.offersModel.getByType(this.editPoint.type);
    this.offers = this.offer.offers;
    // this.editPoint.description = this.destination.description;
    // this.editPoint.name = this.destination.name;
    // this.editPoint.pictures = this.destination.pictures;
    // this.editPoint.offers = this.offers;

    render(this.sortComponent, this.container);
    render(this.tripEventsListComponent, this.container);

    render(
      new EditPointView(
        this.editPoint,
        this.offers,
        this.destination
      ),
      this.tripEventsListComponent.getElement()
    );

    render(
      new NewPointView(
        this.editPoint,
        this.offers,
        this.destination
      ),
      this.tripEventsListComponent.getElement()
    );

    for (let i = 0; i < this.eventPoints.length; i++) {
      render(new TripEventsItemView({points: this.eventPoints[i]}), this.tripEventsListComponent.getElement());
    }
  }
}
