import { CPF } from '../../domain/entities/cpf';
import { Order } from '../../domain/entities/order';
import ItemRepository from '../../domain/repositories/item-repository';
import SimulateShippingCostInput from '../io/simulate-shipping-cost-input';

const DEFAULT_CPF = '12345678909';
export default class SimulatesShippingCost {
    constructor(private readonly itemRepository: ItemRepository) {}

    public async execute(simulateShippingCostInput: SimulateShippingCostInput): Promise<number> {
        const order = new Order(DEFAULT_CPF);
        for(const orderItem of simulateShippingCostInput.orderItems) {
            const item = await this.itemRepository.findBy({id: orderItem.itemId});
            if(!item) throw new Error('Item not found');
            order.addItem(item, orderItem.quantity);
        }
        return Promise.resolve(order.calculateShippingCost());
    }
}