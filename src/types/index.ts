export type PaymentMethod = 'online' | 'cash';
export type Category = 'софт-скил'
                        | 'другое'
                        | 'дополнительное'
                        | 'кнопка' 
                        | 'хард-скил';

// Интерфейс товара
export interface IProductItem {
  id: string;
  description?: string;
  title: string;
  category?: Category;
  image?: string;
  price: number | null; // Товар может быть бесценным
}

// Интефейс для формы заказа
export interface IOrderForm {
  payment: PaymentMethod;
  address: string;
  email: string;
  phone: string;
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

// Интефейс самого заказа
export interface IOrder {
  total: number;
  items: IProductItem[];
}

// Интерфейс для модели API
export interface IService {
  getProductList: () =>  Promise<IProductItem[]>;
  postOrder: () => Promise<IOrderResult>;
}

// Интерфейс результата заказа, который отправляет сервер в результате post запроса
export interface IOrderResult {
  id: string;
  total: number;
}

export interface IOrderResultActions {
  onClick: () => void;
}

// Интерфейс для обработки действий
export interface IProductAction {
  onClick: (event?: MouseEvent) => void;
} 

// Интерфейс для обработки отображения
export interface IView {
  render(data?: object): HTMLElement;
}

// Интерфейс для каталога
export interface ICatalog {
  items: HTMLElement[];
}

// Интерфейс для корзины
export interface IBasket {
	items: HTMLElement[];
	total: number;
	selected: string[];
}