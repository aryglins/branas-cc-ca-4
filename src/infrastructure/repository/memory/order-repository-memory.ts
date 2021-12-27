import { Order } from '../../../domain/entities/order';
import OrderRepository from '../../../domain/repositories/order-repository';

export default class OrderRepositoryMemory implements OrderRepository {
    private readonly orders: Order[] = [];
    private sequence;

    constructor() {
        this.orders = [];
        this.sequence = 1;
    }

    save(order: Order): Promise<Order> {
        this.orders.push(order);
        return Promise.resolve(order);
    }

    seqNextVal(): number {
        return this.sequence++;
    }
}