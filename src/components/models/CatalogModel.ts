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

	deleteItem(id: string) {
		this.items = this.items.filter(item => item.id !== id);
	}

	findById(id: string): IProductItem | undefined {
    return this._items.find(item => item.id === id);
  }
}