import { Item } from '../../domain/entities/item';
import { Order } from '../../domain/entities/order';
import OrderRepository from '../../domain/repositories/order-repository';

export default class OrderRepositoryMemory implements OrderRepository {
    private readonly orders: Order[] = [];

    save(order: Order): Promise<Order> {
        this.orders.push(order);

        return Promise.resolve(order);
    }
}