import { IProductAction } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from "../../common/Card";

export class BasketItem extends Card {
  protected _listIndex: HTMLElement;

  constructor(constainer: HTMLElement, actions: IProductAction) {
    super('card', constainer, actions);
    this._listIndex = ensureElement<HTMLElement>('.basket__item-index', constainer);
  }

  set listNumber(listNumber: number) {
    this.setText(this._listIndex, listNumber);
  }
}