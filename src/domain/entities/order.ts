import { Coupon } from './coupon';
import { CPF } from './cpf';
import { Item } from './item';
import { OrderItem } from './order-item';

export class Order {
    private readonly orderItens: OrderItem[];
    private readonly cpf: CPF;
    private coupon: Coupon | null;
    private _code: string | undefined;
    get code(): string {
        if(!this._code) throw new Error('Order has no code, maybe it was not persited yet');
        return this._code;
    }
    set code(code: string) {
        this._code = code;
    }

    constructor(cpf: string) {
        this.cpf = new CPF(cpf);
        this.orderItens = [];
        this.coupon = null;
    }

    addItem(item: Item, quantity: number) {
        this.orderItens.push(new OrderItem(item, quantity));
    }

    getTotal() {
        const total = this.orderItens.reduce((total, item) => total + item.getSubTotal(), 0);
        return this.applyCouponDisccountIfValid(total) + this.getShippingCost();
    }

    applyCoupon(coupon: Coupon) {
        if(coupon.isExpired()){
            throw new Error('Coupon expired');
        }
        this.coupon = coupon;
    }

    private getShippingCost(): number {
        return this.orderItens.reduce((total, orderItem) => total + orderItem.getShippingCost(), 0);
    } 

    private applyCouponDisccountIfValid(total: number) {
        return this.coupon ? total - this.coupon.getDiscountValue(total) : total;
    }
}