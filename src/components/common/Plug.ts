import { Component } from './../base/Component';
import { IOrderResult, IOrderResultActions } from '../../types/index';
import { ensureElement } from '../../utils/utils';

export class Plug extends Component<IOrderResult> {
  protected _close: HTMLElement;

  constructor(container: HTMLElement, actions: IOrderResultActions) {
    super(container);
    this._close = ensureElement<HTMLElement>('.state__action', this.container);

    if (actions?.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }
}