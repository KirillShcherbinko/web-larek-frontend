import { IProductItem, IOrder, IOrderForm, IDeliveryForm, IContactForm, IOrderLot } from './../../types/index';
import { Model } from '../base/Model';
import _ from 'lodash';

export class OrderModel extends Model<IProductItem> {
  data: IOrderLot = {
    payment: '',
    address: '',
    email: '',
    phone: '',
    items: [],
    total: 0
  }

	setDeliveryField(field: keyof IDeliveryForm, value: string) {
		this.data[field] = value;
		this.events.emit('delivery:ready', this.data);
	}
}
