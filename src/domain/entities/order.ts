import { Coupon } from './coupon';
import { CPF } from './cpf';
import { Item } from './item';
import { OrderItem } from './order-item';

const CODE_SEQUENCE_LENGTH = 8;
export class Order {
    private readonly orderItems: OrderItem[];
    private readonly cpf: CPF;
    private coupon: Coupon | null;
    private _code: string | undefined;
    get code(): string {
        if(!this._code) throw new Error('Order has no code, maybe it was not persited yet');
        return this._code;
    }
    private date: Date;
    constructor(cpf: string, date?: Date) {
        this.cpf = new CPF(cpf);
        this.orderItems = [];
        this.coupon = null;
        this.date = date || new Date();
    }
    
    getTotal() {
        const total = this.orderItems.reduce((total, item) => total + item.getSubTotal(), 0);
        return this.applyCouponDisccountIfValid(total) + this.calculateShippingCost();
    }

    getOrderItems(): OrderItem[] {
        return [...this.orderItems];
    }
    
    addItem(item: Item, quantity: number) {
        this.orderItems.push(new OrderItem(item, quantity));
    }

    applyCoupon(coupon: Coupon) {
        if(coupon.isExpired()){
            throw new Error('Coupon expired');
        }
        this.coupon = coupon;
    }

    calculateShippingCost(): number {
        return this.orderItems.reduce((total, orderItem) => total + orderItem.getShippingCost(), 0);
    }

    generateCode(sequence: number): void {
        const sequenceWithZeros = sequence.toString().padStart(CODE_SEQUENCE_LENGTH, '0');
        this._code = `${this.date.getUTCFullYear()}${sequenceWithZeros}`;
    }
    
    private applyCouponDisccountIfValid(total: number) {
        return this.coupon ? total - this.coupon.getDiscountValue(total) : total;
    }
}