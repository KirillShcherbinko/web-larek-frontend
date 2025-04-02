import { Model } from "../base/Model";
import { FormErrors, IContactForm, IDeliveryForm, IProductItem } from "../../types";
import { validatePhone } from "../../utils/utils";

export class FormModel extends Model<IProductItem> {
  errors: FormErrors = {};

  validateDelivery(order: IDeliveryForm) {
    this.errors = {};
    if (!order.payment) this.errors.payment = 'Необходимо указать способ оплаты';
    if (!order.address) this.errors.address = 'Необходимо указать адрес';
    this.events.emit('deliveryFormErrors:change', this.errors);
    return Object.keys(this.errors).length === 0;
  }

  validateContacts(order: IContactForm) {
    this.errors = {};
    if (!order.email) this.errors.email = 'Необходимо указать email';
    if (!order.phone) this.errors.phone = 'Необходимо указать телефон';
    if (!validatePhone(order.phone)) this.errors.phone = 'Неверный формат номера телефона'
    this.events.emit('contactsFormErrors:change', this.errors);
    return Object.keys(this.errors).length === 0;
  }
}