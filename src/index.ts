import { Category } from './types/index';
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
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const serviceModel = new ServiceModel(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

////////// Шаблоны //////////
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardCBasketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardOrderTemplate = ensureElement<HTMLTemplateElement>('#order');
const cardContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');



// Модель данных приложения
const appState = new AppStateModel(events);

const catalog = new Catalog(document.body);
const wrapper = new Wrapper(document.body);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

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
    console.log(cardPreviewTemplate);
    const cardModal = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
      onClick: () => events.emit('basket:changed', item)
    }, item?.category);

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

////////// Получение даннных с сервера //////////
serviceModel
	.getProductList()
	.then((data: IProductItem[]) => appState.catalog.items = data)
	.catch((error) => console.error(error.message));