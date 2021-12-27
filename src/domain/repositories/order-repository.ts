import { Order } from '../entities/order';

export default interface OrderRepository {
    findBy(options: {code: string}): Promise<Order | undefined>;
    findAll(): Promise<Order[]>;
    save(order: Order): Promise<Order>;
    seqNextVal(): number;
}