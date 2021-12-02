import { Coupon } from './coupon';
import { Item } from './item';
import { OrderItem } from './order-item';
import { validateCpf } from './validate-cpf';

export class Order { 
    private readonly orderItens: OrderItem[];
    private readonly cpf: string;
    private coupon: Coupon | null;

    constructor(cpf: string) {
        if(!validateCpf(cpf)) {
            throw new Error('Invalid CPF');    
        }
        this.cpf = cpf;
        this.orderItens = [];
        this.coupon = null;
    }

    addItem(item: Item, quantity: number) {
        this.orderItens.push(new OrderItem(item, quantity));
    }

    getTotal(){
        const total = this.orderItens.reduce((total, item) => total + item.getSubTotal(), 0);
        return this.coupon ? total - this.coupon.getDiscountValue(total) : total;
    }

    getCpf() {
        return this.cpf;
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    } 
}