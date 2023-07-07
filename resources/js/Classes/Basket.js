import { Item } from './Item.js';
import { Total } from "./Total.js";
export class Basket {
    constructor(total = null, items = []) {
        if (!total)
            this.total = new Total();
        else
            this.total = total;
        this.items = items;
    }
    findById(id) {
        return this.items.find((el) => el.id === id);
    }
    static fromStorage() {
        const json = localStorage.getItem('basket');
        if (!json)
            return new this();
        const total = Total.fromStorage();
        const data = JSON.parse(json);
        const items = [];
        data.forEach((el) => {
            items.push(new Item(el));
        });
        return new this(total, items);
    }
    addOrIncrease(item) {
        const itemInBasket = this.findById(item.id);
        if (itemInBasket) {
            this.addItemQuantity(itemInBasket);
            return itemInBasket;
        }
        else {
            this.items.push(item);
            this.total.sum += item.price;
            this.total.quantity++;
            return null;
        }
    }
    addItemQuantity(item) {
        item.quantity++;
        this.total.quantity++;
        this.total.sum += item.price;
    }
    /**
     *
     * @param item
     * @return {boolean} true if item removed
     */
    subtractItemQuantity(item) {
        item.quantity--;
        this.total.quantity--;
        this.total.sum -= item.price;
        if (item.quantity === 0) {
            this.removeItem(item.id);
            return true;
        }
        return false;
    }
    saveInStorage() {
        localStorage.setItem('basket', JSON.stringify(this.items));
        this.total.saveToStorage();
    }
    getItems() {
        return this.items;
    }
    removeItem(id) {
        const index = this.items.findIndex((el) => el.id === id);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    removeAll() {
        this.total.sum = 0;
        this.total.quantity = 0;
        this.items = [];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    setEmpty() {
        this.items = [];
    }
}
//# sourceMappingURL=Basket.js.map