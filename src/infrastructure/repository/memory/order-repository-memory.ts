import { Order } from '../../../domain/entities/order';
import OrderRepository from '../../../domain/repositories/order-repository';

export default class OrderRepositoryMemory implements OrderRepository {
    private readonly orders: Order[] = [];
    private sequence;

    constructor() {
        this.orders = [];
        this.sequence = 321;
    }

    save(order: Order): Promise<Order> {
        order.generateCode(this.sequence);
        this.orders.push(order);
        this.sequence++;
        return Promise.resolve(order);
    }
}