export type paymentMethod = 'online' | 'cash';

// Интерфейс товара
export interface IProductItem {
  id: string;
  description: string;
  title: string;
  category: string;
  image: string;
  price: number | null; // Товар может быть бесценным
}

// Интерфейс для корзины с товарами
export interface IBasket {
  items: IProductItem[];
  total: number;
}

// Интефейс для формы заказа
export interface IOrderForm {
  payment: paymentMethod;
  address: string;
  email: string;
  phone: string;
  validateDelivery(): boolean;
  validateContacts(): boolean;
}

// Интефейс самого заказа
export interface IOrder {
  total: number;
  items: IProductItem[];
}

// Интерфейс результата заказа, который отправляет сервер в результате post запроса
export interface IOrderResult {
  id: string;
  total: number;
}

// Интерфейс для обработки действий
export interface IAction {
  onClick(event?: MouseEvent): void;
} 

// Интерфейс для обработки отображения
export interface IView {
  render(data?: object): HTMLElement;
}