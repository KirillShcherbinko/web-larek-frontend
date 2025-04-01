import { IProductItem } from "../../types";
import { Model } from "../base/Model";

export class CatalogModel extends Model<IProductItem> {
	protected _items: IProductItem[] = [];

	get items(): IProductItem[] {
		return this._items;
	}

	set items(items: IProductItem[]) {
		this._items = items;
		this.events.emit('catalog:changed');
	}
}