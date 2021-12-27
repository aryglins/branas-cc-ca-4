import OrderRepository from '../../domain/repositories/order-repository';
import FetchOrderByCodeOutput from '../io/fetch-order-by-code-output';

export default class FetchOrderByCode {
    public constructor(private readonly orderRepository: OrderRepository) {}

    public async execute(code: string): Promise<FetchOrderByCodeOutput> {
        const order = await this.orderRepository.findBy({ code });
        if (!order) throw new Error('Order not found');
        return Promise.resolve({
            code: order.code,
            total: order.getTotal(),
            orderItems: order.getOrderItems().map(orderItem => {
                return {
                    quantity: orderItem.quantity,
                    item: {
                        decription: orderItem.item.decription,
                        price: orderItem.item.price
                    }
                }
            }),
        });
    }
}