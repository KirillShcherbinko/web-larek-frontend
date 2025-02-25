# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Архитектура проекта: MVP (Modal View Presenter)

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Описание данных
В данном проекте используются следующие типы данных и интерфейсы:
### type paymentMethod
У пользователя есть два способа оплаты заказа: онлайн и при получении, соответственно данный тип может принимать значения 'online' и 'cash'.
### IProductItem
Данный интерфейс содержит все данные товара: id (уникальный идендификатор товара), описание, название, категория, ссылка на изображение, цена, которая может являться целым числом, так и принимать значение null, если товар имеет статус бесценно.
### IOrderForm
Содержит поля для формы заказа, которую заполняет пользователь: способ оплаты, адрес доставки, адрес электронной почты и номер телефона, а также два метода валидации данных для двух модальных окон соответственно. Методы валидируют информацию о доставке и контактные данные. 
### IOrder
Данный интерфейс определяет данные самого заказа: список товаров и общую стоимость заказа.
### IOrderResult
Определяет данные, которые возвращает сервер в результате отправеления данных заказа: id заказа и его общую стоимость.
### IAction
Интефейс определяет обработчики событий. В данном случае обработку событий мыши.
### IView
Содержит сигнатуру метода render, который должен быть реализован во всех классах-представлениях. Метод отвечает за само отображение элементов на сайте.
### IEvent
Интерфейс, коотрый определяет методы класса EventEmitter и отвечает за обработку событий и передачу данных между представленем и моделью.
