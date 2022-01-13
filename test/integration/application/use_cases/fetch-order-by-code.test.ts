import FetchOrderByCode from "../../../../src/application/use-cases/fetch-order-by-code";
import OrderRepositoryMemory from "../../../../src/infrastructure/repository/memory/order-repository-memory";
import createFakeOrder from "./fake-order.factory";

test("Deve buscar pedido pelo código", async () => {
  const orderRepository = new OrderRepositoryMemory();
  const seqNextVal = await orderRepository.seqNextVal();
  const order = createFakeOrder({
    sequence: seqNextVal,
    cpf: "123.456.789-09",
    orderItems: [
      {
        quantity: 1,
        item: {
          id: 1,
          description: "Item 1",
          price: 70,
        },
      },
    ],
  });
  await orderRepository.save(order);
  const useCase = new FetchOrderByCode(orderRepository);
  const output = await useCase.execute(order.code);
  expect(output).toStrictEqual({
    code: order.code,
    total: 70,
    orderItems: [
      {
        quantity: 1,
        item: {
          decription: "Item 1",
          price: 70,
        },
      },
    ],
  });
});
