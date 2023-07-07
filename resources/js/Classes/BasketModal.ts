import {Modal} from "./Helpers/Modal.js";
import {Basket} from "./Basket.js";
import {Item} from "./Item.js";
import {AlertsList} from "./AlertsList.js";

export class BasketModal extends Modal {
    basket: Basket;
    itemsEl: HTMLElement;
    alertsList: AlertsList;

    constructor(modalSelector: string, basket: Basket, alertsList: AlertsList) {
        super(modalSelector);
        this.basket = basket;
        this.itemsEl = this.element.querySelector('.basket__items');
        this.alertsList = alertsList;
        this.render();
        this.element.querySelector('.basket__remove-all-button').addEventListener('click',()=> this.removeAll());
    }

    render() {
        if (!this.basket.isEmpty()) {
            this.basket.getItems().forEach((item: Item) => {
                const itemEl =this.getItemEl(item);
                this.itemsEl.append(itemEl);
            });
            this.updateTotalSum();
        }
        else this.renderEmptyBasket();
    }

    addItem(item: Item) {
        if(this.basket.isEmpty()) {
            this.element.querySelector('.basket__empty-text').remove();
            (this.element.querySelector('.basket__total') as HTMLElement).style.display = 'block';
            (this.element.querySelector('.basket__buy-button') as HTMLElement).classList.remove('disabled-button');
        }
        const itemInBasket = this.basket.addOrIncrease(item);
        if (itemInBasket) this.updateItemQuantity(itemInBasket);
        else this.itemsEl.append(this.getItemEl(item));
        this.alertsList.addAlert('Товар добавлен в корзину.');
        this.updateTotalSum();
        this.basket.saveInStorage();
    }


    removeAll()
    {
        this.basket.removeAll();
        this.renderEmptyBasket();
        this.basket.saveInStorage();
    }

    private increaseQuantity(item: Item)
    {
        this.basket.addItemQuantity(item);
        this.updateItemQuantity(item);
        this.updateTotalSum();
        this.basket.saveInStorage();
    }

    private subtractQuantity(item: Item)
    {
        this.basket.subtractItemQuantity(item);
        if(item.quantity <= 0) {
            const itemEl = this.element.querySelector(`[data-id="${item.id}"]`) as HTMLElement;
            itemEl.remove();
            if(this.basket.isEmpty()) this.renderEmptyBasket();
        }
        else this.updateItemQuantity(item);
        this.updateTotalSum();
        this.basket.saveInStorage();
    }

    private getItemEl(item: Item): HTMLElement
    {
        const itemHTML = document.createElement('div');
        itemHTML.classList.add('basket__item');
        itemHTML.setAttribute('data-id', String(item.id));
        itemHTML.innerHTML = `
        <div class="basket__item-element basket__item-name">${item.name}</div>
        <div class="basket__item-element basket__item-price">${item.price} руб.</div>
        <div class="basket__item-element basket__item-quantity">${item.quantity}</div>
        <button class="basket__item-element basket__item-button basket__item-button_insert">+</button>
        <button class="basket__item-element basket__item-button basket__item-button_subtract">-</button>
        `;
        itemHTML.querySelector('.basket__item-button_insert').addEventListener('click', ()=> {
            this.increaseQuantity(item);
        });
        itemHTML.querySelector('.basket__item-button_subtract').addEventListener('click', ()=> {
            this.subtractQuantity(item);
        });
        return itemHTML;
    }
    private updateTotalSum()
    {
        (this.element.querySelector('.basket__total-sum-number') as HTMLElement).innerHTML = String(this.basket.total.sum);
    }
    private updateItemQuantity(item: Item)
    {
        const itemEl = this.element.querySelector(`[data-id="${item.id}"]`) as HTMLElement;
        itemEl.querySelector('.basket__item-quantity').innerHTML = String(item.quantity);
    }
    private renderEmptyBasket()
    {
        this.itemsEl.innerHTML = `<div class='basket__empty-text'>Корзина пуста</div>`;
        (this.element.querySelector('.basket__total') as HTMLElement).style.display = 'none';
        (this.element.querySelector('.basket__buy-button') as HTMLElement).classList.add('disabled-button');
    }
}
