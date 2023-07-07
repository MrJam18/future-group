import {Item} from './Item.js';
import {Total} from "./Total.js";

export class Basket {
    private items: Item[]
    total: Total
    constructor(total: Total = null, items: Array<Item> = []) {
        if(!total) this.total = new Total();
        else this.total = total;
        this.items = items;
    }

    findById(id: number): Item | null
    {
       return this.items.find((el)=> el.id === id);
    }

    static fromStorage(): Basket | null
    {
        const json = localStorage.getItem('basket');
        if(!json) return new this();
        const total = Total.fromStorage();
        const data: Array<any> = JSON.parse(json);
        const items = [];
        data.forEach((el)=> {
            items.push(new Item(el));
        });
        return new this(total, items);
    }

    addOrIncrease(item: Item): Item | null {
        const itemInBasket = this.findById(item.id);
        if(itemInBasket) {
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

    addItemQuantity(item: Item): void
    {
        item.quantity++;
        this.total.quantity++;
        this.total.sum += item.price;
    }

    /**
     *
     * @param item
     * @return {boolean} true if item removed
     */
    subtractItemQuantity(item: Item): boolean
    {
        item.quantity--;
        this.total.quantity--;
        this.total.sum -= item.price;
        if(item.quantity === 0) {
            this.removeItem(item.id);
            return true;
        }
        return false;
    }

    saveInStorage(): void
    {
        localStorage.setItem('basket', JSON.stringify(this.items));
        this.total.saveToStorage();
    }

    getItems(): Item[]
    {
        return this.items;
    }

    removeItem(id: number): void
    {
        const index = this.items.findIndex((el)=> el.id === id);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    removeAll(): void
    {
        this.total.sum = 0;
        this.total.quantity = 0;
        this.items = [];
    }

    isEmpty(): boolean
    {
        return this.items.length === 0;
    }

    setEmpty(): void
    {
        this.items = [];
    }
}
