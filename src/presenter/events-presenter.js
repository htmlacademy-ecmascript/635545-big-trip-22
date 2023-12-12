import {render} from '../render.js';
import SortView from '../view/sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import TripEventsItemView from '../view/trip-events-item.js';
import NewPointView from '../view/new-point.js';
import EditPointView from '../view/edit-point.js';

const EVENT_COUNT = 3;

export default class EventsPresenter {
  sortComponent = new SortView();
  tripEventsListComponent = new TripEventsListView();
  editPointComponent = new EditPointView();
  newPointComponent = new NewPointView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.tripEventsListComponent, this.container);
    render(this.editPointComponent, this.tripEventsListComponent.getElement());
    render(this.newPointComponent, this.tripEventsListComponent.getElement());

    for (let i = 0; i < EVENT_COUNT; i++) {
      render(new TripEventsItemView(), this.tripEventsListComponent.getElement());
    }
  }
}
