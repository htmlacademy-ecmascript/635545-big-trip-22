import AbstractView from '../framework/view/abstract-view.js';

export default class RadioListView extends AbstractView {
  _items = [];
  _handleItemChange = null;

  constructor({items, onItemChange = () => {}}) {
    super();
    this._items = items;
    this._handleItemChange = onItemChange;
    this.element.addEventListener('change', this.#itemChangeHamdler);
  }

  #itemChangeHamdler = (evt) => {
    evt.preventDefault();
    this._handleItemChange?.(evt.target.dataset.item);
  };
}
