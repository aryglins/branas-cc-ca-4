import FetchOrderByCode from '../../../../src/application/use-cases/fetch-order-by-code';
import { Item } from "../../../../src/domain/entities/item";
import { Order } from "../../../../src/domain/entities/order";
import OrderRepositoryMemory from "../../../../src/infrastructure/repository/memory/order-repository-memory";

test("Deve buscar pedido pelo código", async () => {
  const order = new Order("12345678909");
  const orderRepository = new OrderRepositoryMemory();
  const seqNextVal = orderRepository.seqNextVal();
  order.generateCode(seqNextVal);
  const fakeItem = new Item(999, "Fake Item", 99);
  order.addItem(fakeItem, 1);
  orderRepository.save(order);
  const input = {
    code: order.code,
  };
  const useCase = new FetchOrderByCode(orderRepository);
  const output = await useCase.execute(order.code);
  expect(output).toStrictEqual({
    code: order.code,
    total: 99,
    orderItems: [
      {
        quantity: 1,
        item: {
          decription: "Fake Item",
          price: 99,
        },
      },
    ],
  });
});
