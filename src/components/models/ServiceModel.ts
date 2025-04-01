import { IProductItem, IOrderForm, IOrderResult } from '../../types/index';
import { Api, ApiListResponse } from '../base/api';

interface IServiceModel {
	contentUrl: string;
	items: IProductItem[];
	getProductList(): Promise<IProductItem[]>;
	postValidatedOrderData(order: IOrderForm): Promise<IOrderResult>;
}

export class ServiceModel extends Api implements IServiceModel {
	contentUrl: string;
	items: IProductItem[];

	constructor(contentUrl: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this.contentUrl = contentUrl;
	}

	getProductList(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.contentUrl + item.image,
			}))
		);
	}
	postValidatedOrderData(order: IOrderForm): Promise<IOrderResult> {
    return this.post('/order', order).then((data: IOrderResult) => data);
  }
}
