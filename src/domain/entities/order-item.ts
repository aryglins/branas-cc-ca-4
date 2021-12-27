import { Item } from './item';

export class OrderItem {
    constructor(
        readonly item: Item,
        readonly quantity: number
    ) { }

    getSubTotal() {
        return this.item.price * this.quantity;
    }  

    getShippingCost(): number {
        return this.quantity * this.item.getShippingCost();
    }
}