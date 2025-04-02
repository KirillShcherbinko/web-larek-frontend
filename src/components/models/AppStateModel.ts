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

  clear() {
    this.order.data.items.forEach(id => {
      this.basket.deleteItem(id);
      this.catalog.deleteItem(id);
      this.order.setDeliveryField('payment', '');
      this.order.setDeliveryField('address', '');
      this.order.setContactsField('email', '');
      this.order.setContactsField('phone', '');
      this.order.data.total = 0;
    });
  }
}