import { Item } from './item';

export class OrderItem {
    constructor(
        private item: Item,
        private quantity: number
    ) { }

    getSubTotal() {
        return this.item.getPrice() * this.quantity;
    }  
}