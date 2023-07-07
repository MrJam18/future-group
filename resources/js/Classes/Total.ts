export class Total {
    sum: number;
    quantity: number;

    constructor(sum = 0, quantity = 0)
    {
        this.sum = sum;
        this.quantity = quantity;
    }

    static fromStorage(): Total
    {
        const totalJSON = localStorage.getItem('total');
        if(!totalJSON) return new this();
        else {
            const total = JSON.parse(totalJSON);
            return new this(total.sum, total.quantity);
        }
    }
    saveToStorage(): void
    {
        const json = JSON.stringify(this);
        localStorage.setItem('total', json);
    }
}