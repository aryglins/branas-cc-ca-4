import { Item } from './item';

export class Order {  
    constructor(private cpf: string, readonly items: Item[]) {}

    getTotal(discount: number) {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0) * (1 - discount);
    }

    getCpf() {
        return this.cpf;
    }
}