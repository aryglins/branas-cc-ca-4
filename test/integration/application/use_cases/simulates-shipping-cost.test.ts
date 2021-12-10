import SimulatesShippingCost from '../../../../src/application/use_cases/simulates-shipping-cost';
import ItemRepositoryMemory from '../../../../src/infrastructure/repository/item-repository-memory';

test('Deve simular preço do frete', async () => {
    const simulatedShippingCostInput = {
        orderItems: [
            {itemId: 1, quantity: 1},
            {itemId: 2, quantity: 2},
            {itemId: 3, quantity: 1},
        ],
    }
    const simulatedShippingCost = new SimulatesShippingCost(new ItemRepositoryMemory())
    const simulatedShippingCostOutput = await simulatedShippingCost.execute(simulatedShippingCostInput);
    expect(simulatedShippingCostOutput).toEqual(70);
});