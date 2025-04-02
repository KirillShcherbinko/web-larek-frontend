import { Component } from './../base/Component';
import { IOrderResult, IOrderResultActions } from '../../types/index';
import { ensureElement } from '../../utils/utils';

export class Plug extends Component<IOrderResult> {
  protected _close: HTMLElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, actions: IOrderResultActions, total: number) {
    super(container);
    this._total = ensureElement<HTMLElement>('.order-success__description', container);
    this._close = ensureElement<HTMLElement>('.order-success__close', container);

    this.setText(this._total, `Списано ${total} синапсов`)

    if (actions?.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }
}