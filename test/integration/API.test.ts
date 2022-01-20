import axios from 'axios';
import PlaceOrderInput from '../../src/application/io/place-order-input';

test("Deve testar a API", async () => { 
    const placeOrderInput: PlaceOrderInput = {
        cpf: '123.456.789-09',
        orderItems: [
            {id: 1, quantity: 1},
            {id: 2, quantity: 2},
            {id: 3, quantity: 1},
        ],
        coupon: { code: 'DESCONTO10'},
        date: new Date('2020-01-01')
    };

    const response = await axios.post('http://localhost:3000/orders', placeOrderInput);
    expect(response.data.total).toStrictEqual(1366);
});