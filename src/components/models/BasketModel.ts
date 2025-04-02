import { IProductItem } from '../../types';
import { Model } from '../base/Model';
import { CatalogModel } from './CatalogModel';
import _ from "lodash"

export class BasketModel extends Model<IProductItem> {
	items: string[] = [];

  addItem(id: string) {
    this.items = [...this.items, id];
  }

	deleteItem(id: string) {
    this.items = this.items.filter(item => item !== id);
    this.events.emit('basket:changed');
	}

	getTotal(catalog: CatalogModel) {
		return this.items.reduce(
			(sum, id) => sum + (catalog.findById(id)?.price || 0),
			0
		);
	}
}
