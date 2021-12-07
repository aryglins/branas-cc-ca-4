import { Item } from './item';

export class OrderItem {
    constructor(
        private item: Item,
        private quantity: number
    ) { }

    getSubTotal() {
        return this.item.getPrice() * this.quantity;
    }  

    getShippingCost(): number {
        return this.quantity * this.item.getShippingCost();
    }
}