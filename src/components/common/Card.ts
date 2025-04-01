import { Category, IAction, IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Card extends Component<IProductItem> {
  protected _description: HTMLElement;
  protected _title: HTMLElement;
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;

  protected _categoryClassNames = <Record<string, string>>{
		'дополнительное': 'additional',
		'софт-скил': 'soft',
		'кнопка': 'button',
		'хард-скил': 'hard',
		'другое': 'other',
	};

  constructor(protected blockName: string, container: HTMLElement, actions?: IAction, categoryName?: Category) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._description = ensureElement<HTMLElement>(`.${blockName}__description`, container);
    this._category = ensureElement<HTMLElement>(
      `.${blockName}__category .${blockName}__category_${this._categoryClassNames[categoryName]}`, container
    );
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);

    if (actions?.onClick) {
			this.container.addEventListener('click', actions.onClick);
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

  set price(price: number) {
    this.setText(this._price, price);
  }
}