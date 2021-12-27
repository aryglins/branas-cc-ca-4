import OrderRepository from '../../domain/repositories/order-repository';
import FetchOrdersOutput from '../io/fetch-orders-output';

export default class FetchOrders {
    public constructor(private readonly orderRepository: OrderRepository) {}

    public async execute(): Promise<FetchOrdersOutput> {
        const orders = await this.orderRepository.findAll();
        return Promise.resolve({
            orders: orders.map(order => {
                return {
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
                };
            }),
        });
    }
}