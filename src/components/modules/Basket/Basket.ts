import { IBasket } from "../../../types";
import { createElement, ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/events";

export class Basket extends Component<IBasket> {
  protected _items: HTMLElement[] = [];
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents ) {
    super(container);

    this._list = ensureElement<HTMLElement>('.basket__list', container);
    this._total = ensureElement<HTMLElement>('.basket__price', container);
    this._button = ensureElement<HTMLButtonElement>('.basket__button', container);

    this._button.addEventListener('click', () => {
      events.emit('order:open');
    })

    this.setDisabled(this._button, true);
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
    } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: ''
      }));
    }
  }

  set selected(isEmpty: boolean) {
    if (isEmpty) {
      this.setDisabled(this._button, true);
    } else {
      this.setDisabled(this._button, false);
    }
  }

  set total(total: number) {
    if (this._total) this.setText(this._total, `${total} синапсов`);
  }
}