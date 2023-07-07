export class Item {
    constructor(data = null) {
        if (data) {
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
    static checkNull(data) {
        if (data === null || data === undefined) {
            throw new Error('data is empty');
        }
    }
    static buildFromElement(el) {
        const data = {};
        data.price = el.getAttribute('data-price');
        data.name = el.getAttribute('data-name');
        data.quantity = 1;
        data.id = Number(el.getAttribute('data-id'));
        return new this(data);
    }
}
//# sourceMappingURL=Item.js.map