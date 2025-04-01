import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { Model } from "../base/Model";
import { CatalogModel } from "./CatalogModel";

export class AppStateModel extends Model<{}> {
  catalog: CatalogModel;
  preview: string | null = null;
  loading: boolean = false;

  constructor(events: IEvents) {
    super({}, events);
    this.catalog = new CatalogModel({}, events);
  }

  setPreview(item: IProductItem) {
    this.preview = item.id;
    this.events.emit('preview:changed', item);
  }
}