import { Category, IDeliveryForm, IOrderForm } from './types/index';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import { Wrapper } from './components/common/Wrapper';
import { AppStateModel } from './components/models/AppStateModel';
import { ServiceModel } from './components/models/ServiceModel';
import { Catalog } from './components/modules/Catalog/Catalog';
import { CatalogItem } from './components/modules/Catalog/CatalogItem';
import './scss/styles.scss';
import { IProductItem } from './types';
import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { BasketHeader } from './components/modules/Basket/BasketHeader';
import { BasketCounter } from './components/modules/Basket/BasketCounter';
import { BasketItem } from './components/modules/Basket/BasketItem';
import { Basket } from './components/modules/Basket/Basket';
import { OrderDelivery } from './components/modules/Order/OrderDelivery';
import { OrderContacts } from './components/modules/Order/OrderContacts';
import { add } from 'lodash';

const events = new EventEmitter();
const serviceModel = new ServiceModel(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

////////// Шаблоны //////////
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardCBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');



// Модель данных приложения
const appState = new AppStateModel(events);

////////// Глобальные контейнеры //////////
const basketHeader = new BasketHeader(document.body, events);
const basketCounter = new BasketCounter(document.body);
const catalog = new Catalog(document.body);
const wrapper = new Wrapper(document.body);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

////////// Переиспользуемые интерфейсы //////////
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new OrderDelivery(cloneTemplate(deliveryTemplate), events);
const contacts = new OrderContacts(cloneTemplate(contactsTemplate), events);

////////// Отрисовка модальных окон //////////
events.on('modal:open', () => {
  wrapper.locked = true;
});

events.on('modal:close', () => {
  wrapper.locked = false;
});

////////// События для каталога с карточками //////////
events.on('catalog:changed', () => {
  catalog.items = appState.catalog.items.map(item => {
    const catalogItem = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('item:select', item)
    }, item.category)
    return catalogItem.render({
      title: item.title,
      category: item.category,
      image: item.image,
      price: item.price,
    })
  })
})

events.on('item:select', (item: IProductItem) => {
  appState.setPreview(item);
});

////////// Появление модального окна карточки //////////
events.on('preview:changed', (item: IProductItem) => {
  const showItem = (item: IProductItem) => {
    const cardModal = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
      onClick: () => {
        appState.basket.addItem(item.id);
        events.emit('basket:changed', item);
        modal.close();
      }
    }, item.category);

    if (appState.basket.items.includes(item.id)) cardModal.disabled();

    modal.render({
      content: cardModal.render({
        title: item.title,
        description: item.description,
        category: item.category,
        image: item.image,
        price: item.price,
      })
    })
  }
  
  if (item) showItem(item);
  else modal.close();
})

////////// События корзины //////////
events.on('basket:open', () => {
  modal.render({
		content: createElement<HTMLElement>('div', {}, [
			basket.render(),
		]),
	});
});

events.on('basket:changed', () => {
  basketCounter.counter = appState.basket.items.length; 

  basket.items = appState.basket.items.map((id: string, index: number) => {
    const basketItem = new BasketItem(cloneTemplate(cardCBasketTemplate), {
      onClick: () => appState.basket.deleteItem(id)
    })

    const item = appState.catalog.findById(id);

    basketItem.listNumber = index + 1;

    return basketItem.render({
      title: item.title,
      price: item.price,
    })
  });

  basket.selected = appState.basket.items.length === 0;
  basket.total = appState.basket.getTotal(appState.catalog);
});

////////// События для оформления заказа //////////
events.on('delivery:open', () => {
  modal.render({
		content: delivery.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof IDeliveryForm; value: string }) => {
		appState.order.setDeliveryField(data.field, data.value);
		appState.form.validateDelivery(appState.order.data);
	}
);

events.on('deliveryFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { payment, address } = errors;
	delivery.valid = !payment && !address;
	delivery.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on('contacts:open', () => {
  modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
})

////////// Получение даннных с сервера //////////
serviceModel
	.getProductList()
	.then((data: IProductItem[]) => appState.catalog.items = data)
	.catch((error) => console.error(error.message));