import { Modal } from "./Helpers/Modal.js";
export class BasketModal extends Modal {
    constructor(modalSelector, basket, alertsList) {
        super(modalSelector);
        this.basket = basket;
        this.itemsEl = this.element.querySelector('.basket__items');
        this.alertsList = alertsList;
        this.render();
        this.element.querySelector('.basket__remove-all-button').addEventListener('click', () => this.removeAll());
    }
    render() {
        if (!this.basket.isEmpty()) {
            this.basket.getItems().forEach((item) => {
                const itemEl = this.getItemEl(item);
                this.itemsEl.append(itemEl);
            });
            this.updateTotalSum();
        }
        else
            this.renderEmptyBasket();
    }
    addItem(item) {
        if (this.basket.isEmpty()) {
            this.element.querySelector('.basket__empty-text').remove();
            this.element.querySelector('.basket__total').style.display = 'block';
            this.element.querySelector('.basket__buy-button').classList.remove('disabled-button');
        }
        const itemInBasket = this.basket.addOrIncrease(item);
        if (itemInBasket)
            this.updateItemQuantity(itemInBasket);
        else
            this.itemsEl.append(this.getItemEl(item));
        this.alertsList.addAlert('Товар добавлен в корзину.');
        this.updateTotalSum();
        this.basket.saveInStorage();
    }
    removeAll() {
        this.basket.removeAll();
        this.renderEmptyBasket();
        this.basket.saveInStorage();
    }
    increaseQuantity(item) {
        this.basket.addItemQuantity(item);
        this.updateItemQuantity(item);
        this.updateTotalSum();
        this.basket.saveInStorage();
    }
    subtractQuantity(item) {
        this.basket.subtractItemQuantity(item);
        if (item.quantity <= 0) {
            const itemEl = this.element.querySelector(`[data-id="${item.id}"]`);
            itemEl.remove();
            if (this.basket.isEmpty())
                this.renderEmptyBasket();
        }
        else
            this.updateItemQuantity(item);
        this.updateTotalSum();
        this.basket.saveInStorage();
    }
    getItemEl(item) {
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
        itemHTML.querySelector('.basket__item-button_insert').addEventListener('click', () => {
            this.increaseQuantity(item);
        });
        itemHTML.querySelector('.basket__item-button_subtract').addEventListener('click', () => {
            this.subtractQuantity(item);
        });
        return itemHTML;
    }
    updateTotalSum() {
        this.element.querySelector('.basket__total-sum-number').innerHTML = String(this.basket.total.sum);
    }
    updateItemQuantity(item) {
        const itemEl = this.element.querySelector(`[data-id="${item.id}"]`);
        itemEl.querySelector('.basket__item-quantity').innerHTML = String(item.quantity);
    }
    renderEmptyBasket() {
        this.itemsEl.innerHTML = `<div class='basket__empty-text'>Корзина пуста</div>`;
        this.element.querySelector('.basket__total').style.display = 'none';
        this.element.querySelector('.basket__buy-button').classList.add('disabled-button');
    }
}
//# sourceMappingURL=BasketModal.js.map