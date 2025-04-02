import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { Model } from "../base/Model";
import { BasketModel } from "./BasketModel";
import { CatalogModel } from "./CatalogModel";
import { FormModel } from "./FormModel";
import { OrderModel } from "./OrderModel";

export class AppStateModel extends Model<{}> {
  basket: BasketModel;
  catalog: CatalogModel;
  form: FormModel;
  order: OrderModel;

  preview: string | null = null;
  loading: boolean = false;

  constructor(events: IEvents) {
    super({}, events);

    this.basket = new BasketModel({}, events);
    this.catalog = new CatalogModel({}, events);
    this.form = new FormModel({}, events);
    this.order = new OrderModel({}, events);
  }

  setPreview(item: IProductItem) {
    this.preview = item.id;
    this.events.emit('preview:changed', item);
  }
}