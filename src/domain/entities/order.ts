import { Coupon } from './coupon';
import { CPF } from './cpf';
import { Item } from './item';
import { OrderItem } from './order-item';

export class Order {
    private readonly orderItens: OrderItem[];
    private readonly cpf: CPF;
    private coupon: Coupon | null;

    constructor(cpf: string) {
        this.cpf = new CPF(cpf);
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

    addCoupon(coupon: Coupon) {
        if(coupon.isExpired()){
            throw new Error('Coupon expired');
        }
        this.coupon = coupon;
    }

    getShippingCost(): number {
        return this.orderItens.reduce((total, orderItem) => total + orderItem.getShippingCost(), 0);
    } 
}