import {render} from '../render.js';
import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import TripEventsItemView from '../view/trip-events-item.js';
import NewPointView from '../view/new-point.js';
import EditPointView from '../view/edit-point.js';

export default class EventsPresenter {
  sortComponent = new SortView();
  tripEventsListComponent = new TripEventsListView();
  // editPointComponent = new EditPointView();
  newPointComponent = new NewPointView();

  constructor({container, eventPointsModel, editPointModel}) {
    this.container = container;
    this.eventPointsModel = eventPointsModel;
    this.editPointModel = editPointModel;
  }

  init() {
    this.eventPoints = [...this.eventPointsModel.get()];
    this.editPoint = this.editPointModel.get();
    render(this.sortComponent, this.container);
    render(this.tripEventsListComponent, this.container);
    render(new EditPointView({editPoint: this.editPoint[0]}), this.tripEventsListComponent.getElement());

    render(this.newPointComponent, this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.eventPoints.length; i++) {
      render(new TripEventsItemView({points: this.eventPoints[i]}), this.tripEventsListComponent.getElement());
    }
  }
}
