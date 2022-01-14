import { Order } from '../../../domain/entities/order';
import OrderRepository from '../../../domain/repositories/order-repository';

export default class OrderRepositoryMemory implements OrderRepository {
    private readonly orders: Order[] = [];
    private sequence;

    constructor() {
        this.orders = [];
        this.sequence = 1;
    }

    findBy(options: { code: string }): Promise<Order | undefined> {
        return Promise.resolve(this.orders.find(order => order.code === options.code));
    }

    findAll(): Promise<Order[]> {
        return Promise.resolve([...this.orders]);
    }

    save(order: Order): Promise<Order> {
        this.orders.push(order);
        return Promise.resolve(order);
    }

    seqNextVal(): Promise<number> {
        return Promise.resolve(this.sequence++);
    }

    count(): Promise<number> {
        return Promise.resolve(this.orders.length);
    }
}