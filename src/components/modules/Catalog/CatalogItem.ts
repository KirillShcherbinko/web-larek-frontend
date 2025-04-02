import { Category, IProductAction } from "../../../types";
import { Card } from "../../common/Card";

export class CatalogItem extends Card {
  constructor(container: HTMLElement, actions?: IProductAction, categoryName?: Category ){
    super('card', container, actions, categoryName);
  }

  disabled() {
    this.setDisabled(this._button, true);
  }
}