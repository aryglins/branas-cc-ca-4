import { Item } from './item';

export class OrderItem {
    constructor(
        public item: Item,
        public quantity: number
    ) { }

    getSubTotal() {
        return this.item.getPrice() * this.quantity;
    }  
}