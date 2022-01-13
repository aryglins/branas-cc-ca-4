import PlaceOrderInput from '../../../../src/application/io/place-order-input';
import PlaceOrder from '../../../../src/application/use-cases/place-order';
import MemoryRepositoryFactory from '../../../../src/infrastructure/factories/memory-repository-factory';
import PostgresRepositoryFactory from '../../../../src/infrastructure/factories/postgres-repository-factory';
import CouponRepositoryMemory from '../../../../src/infrastructure/repository/memory/coupon-repository-memory';
import ItemRepositoryMemory from '../../../../src/infrastructure/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../../../src/infrastructure/repository/memory/order-repository-memory';

test('Deve fazer um pedido', async() => {
    const placeOrderInput: PlaceOrderInput = {
        cpf: '123.456.789-09',
        orderItems: [
            {id: 1, quantity: 1},
            {id: 2, quantity: 2},
            {id: 3, quantity: 1},
        ],
        coupon: { code: 'DESCONTO10'},
        date: new Date('2020-01-01'),
    };
    const placeOrder = new PlaceOrder(new PostgresRepositoryFactory());
    const placeOrderOutput = await placeOrder.execute(placeOrderInput);
    expect(placeOrderOutput).toStrictEqual({
        code: '202000000001',
        total: 1440*0.9 + 70,
    });
});