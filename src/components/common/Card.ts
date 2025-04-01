import { Category, IProductAction, IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Card extends Component<IProductItem> {
  protected _title: HTMLElement;
  protected _description: HTMLElement;
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  protected _categoryClassNames = <Record<string, string>>{
		'дополнительное': 'additional',
		'софт-скил': 'soft',
		'кнопка': 'button',
		'хард-скил': 'hard',
		'другое': 'other',
	};

  constructor(protected blockName: string, container: HTMLElement, actions?: IProductAction, categoryName?: Category) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._description = container.querySelector(`.${blockName}__text`);
    this._category = container.querySelector(`.${blockName}__category`);
    this._image = container.querySelector(`.${blockName}__image`);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    this._button = container.querySelector('.button');

    this._category.classList.add(`${blockName}__category_${this._categoryClassNames[categoryName]}`)

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        this.container.addEventListener('click', actions.onClick);
      }
		}
  }

  set id(id: string) {
    this.container.dataset.id = id;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(title: string) {
    this.setText(this._title, title);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set description(description: string) {
    this.setText(this._description, description)
  }

  set category(category: Category) {
    this.setText(this._category, category);
  }

  set image(image: string) {
    this.setImage(this._image, image, this.title);
  }

  set price(price: number | null) {
    if (price) this.setText(this._price, `${price} синапсов`);
    else {
      this.setText(this._price, 'Бесценно');
      this.setDisabled(this._button, true);
    }
  }
}