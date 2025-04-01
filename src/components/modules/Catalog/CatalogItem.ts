import { Category, IProductAction } from "../../../types";
import { Card } from "../../common/Card";

export class CatalogItem extends Card {
  constructor(container: HTMLElement, actions?: IProductAction, category?: Category ){
    super('card', container, actions, category);
  }
}