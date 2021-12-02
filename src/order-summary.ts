import { Order } from './order';

export class OrderSummmary {  
    constructor(readonly order: Order, readonly discount: number, readonly total: number) {}
}