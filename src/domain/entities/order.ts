import { Coupon } from './coupon';
import { CPF } from './cpf';
import { Item } from './item';
import { OrderItem } from './order-item';

const CODE_SEQUENCE_LENGTH = 8;
export class Order {
    private readonly orderItems: OrderItem[];
    private readonly _cpf: CPF;
    get cpf(): string {
        return this._cpf.value;
    }
    private _coupon: Coupon | null;
    get coupon(): Coupon | null {
        return this._coupon;
    }
    private _code: string | undefined;
    get code(): string {
        if(!this._code) throw new Error('Order has no code, maybe it was not persited yet');
        return this._code;
    }
    readonly date: Date;
    constructor(cpf: string, date?: Date, orderItems?: OrderItem[]) {
        this._cpf = new CPF(cpf);
        this.orderItems = orderItems ?? [];
        this._coupon = null;
        this.date = date || new Date();
    }
    
    getTotal() {
        const total = this.orderItems.reduce((total, item) => total + item.getSubTotal(), 0);
        console.log(total);
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
        this._coupon = coupon;
    }

    calculateShippingCost(): number {
        return this.orderItems.reduce((total, orderItem) => total + orderItem.getShippingCost(), 0);
    }

    generateCode(sequence: number): void {
        this._code = Order.generateCode(sequence, this.date);
    }

    static generateCode(sequence: number, date: Date): string {
        const sequenceWithZeros = sequence.toString().padStart(CODE_SEQUENCE_LENGTH, '0');
        return `${date.getUTCFullYear()}${sequenceWithZeros}`;
    }
    
    private applyCouponDisccountIfValid(total: number) {
        return this._coupon ? total - this._coupon.getDiscountValue(total) : total;
    }
}