import { IDeliveryForm } from '../../../types';
import { IEvents } from '../../base/events';
import { Form } from '../../common/Form';

export class OrderDelivery extends Form<IDeliveryForm> {
  protected _cardButton: HTMLButtonElement;
  protected _cashButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents){
    super(container, events);

    this._cardButton = container.elements.namedItem('card') as HTMLButtonElement;
    this._cashButton = container.elements.namedItem('cash') as HTMLButtonElement;

    this._cardButton.addEventListener('click', () => this.payment = 'card');
    this._cashButton.addEventListener('click', () => this.payment = 'cash');
  }

  set payment (payment: 'card' | 'cash') {
    if (payment === 'card') {
      this._cardButton.classList.add('button_alt-active');
      this._cardButton.classList.remove('button_alt');

      this._cashButton.classList.add('button_alt');
      this._cashButton.classList.remove('button_alt-active');
    } else {
      this._cashButton.classList.add('button_alt-active');
      this._cashButton.classList.remove('button_alt');

      this._cardButton.classList.add('button_alt');
      this._cardButton.classList.remove('button_alt-active');
    }

    this.events.emit('order.payment:change', { field: 'payment', value: payment });
  }

  set address(address: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = address;
  }

}