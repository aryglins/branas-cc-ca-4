import PlaceOrderInput from '../../../../src/application/io/place-order-input';
import PlaceOrder from '../../../../src/application/use_cases/place-order';
import CouponRepositoryMemory from '../../../../src/infrastructure/repository/coupon-repository-memory';
import ItemRepositoryMemory from '../../../../src/infrastructure/repository/item-repository-memory';
import OrderRepositoryMemory from '../../../../src/infrastructure/repository/order-repository-memory';

test('Deve fazer um pedido', async() => {
    const placeOrderInput: PlaceOrderInput = {
        cpf: '123.456.789-09',
        orderItems: [
            {id: 1, quantity: 1},
            {id: 2, quantity: 2},
            {id: 3, quantity: 1},
        ],
        coupon: { code: 'DESCONTO10'}
    };
    const placeOrder = new PlaceOrder(new OrderRepositoryMemory(new Date('2021-01-01')), new ItemRepositoryMemory(), new CouponRepositoryMemory());
    const placeOrderOutput = await placeOrder.execute(placeOrderInput);
    expect(placeOrderOutput).toStrictEqual({
        code: '202100000000',
        total: 1440*0.9 + 70,
    });
});