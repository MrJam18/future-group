export class Item {
    id: number;
    name: string;
    quantity: number;
    price: number;

    constructor(data = null) {
        if(data) {
            Item.checkNull(data.name);
            Item.checkNull(data.quantity);
            Item.checkNull(data.price);
            Item.checkNull(data.id);
            this.name = data.name;
            this.quantity = +data.quantity;
            this.price = +data.price;
            this.id = data.id;
        }
    }
    private static checkNull(data): void
    {
        if(data === null || data === undefined) {
            throw new Error('data is empty');
        }
    }
    static buildFromElement(el: Element): Item
    {
        const data: Record<any, any> = {};
        data.price = el.getAttribute('data-price');
        data.name = el.getAttribute('data-name');
        data.quantity = 1;
        data.id = Number(el.getAttribute('data-id'));
        return new this(data);
    }
}
