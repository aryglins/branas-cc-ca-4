import { Order } from '../../../domain/entities/order';
import OrderRepository from '../../../domain/repositories/order-repository';


const CODE_SEQUENCE_LENGTH = 8;
export default class OrderRepositoryMemory implements OrderRepository {
    private readonly orders: Order[] = [];
    private readonly currentDate: Date;
    private orderSequence;

    constructor(currentDate?: Date) {
        this.currentDate = currentDate || new Date();
        this.orders = [];
        this.orderSequence = 0;
    }

    save(order: Order): Promise<Order> {
        order.code = this.currentDate.getUTCFullYear().toString() + this.generateCodeSequence();
        this.orders.push(order);
        return Promise.resolve(order);
    }

    private generateCodeSequence() {
        const sequence = this.orderSequence.toString();
        const sequenceWithZeros = sequence.padStart(CODE_SEQUENCE_LENGTH, '0');
        this.orderSequence++;
        return sequenceWithZeros;
    }
}