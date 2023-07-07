export class Total {
    constructor(sum = 0, quantity = 0) {
        this.sum = sum;
        this.quantity = quantity;
    }
    static fromStorage() {
        const totalJSON = localStorage.getItem('total');
        if (!totalJSON)
            return new this();
        else {
            const total = JSON.parse(totalJSON);
            return new this(total.sum, total.quantity);
        }
    }
    saveToStorage() {
        const json = JSON.stringify(this);
        localStorage.setItem('total', json);
    }
}
//# sourceMappingURL=Total.js.map