import FetchOrders from "../../../../src/application/use-cases/fetch-orders";
import OrderRepositoryMemory from "../../../../src/infrastructure/repository/memory/order-repository-memory";
import createFakeOrder from "./fake-order.factory";

test("Deve retornar lista de pedidos", async () => {
  const orderRepository = new OrderRepositoryMemory();
  const sequence1 = orderRepository.seqNextVal();
  const order1 = createFakeOrder({
    sequence: sequence1,
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
  const squence2 = orderRepository.seqNextVal();
  const order2 = createFakeOrder({
    sequence: squence2,
    cpf: "123.456.789-09",
    orderItems: [
      {
        quantity: 2,
        item: {
          id: 1,
          description: "Item 1",
          price: 70,
        },
      },
      {
        quantity: 1,
        item: {
          id: 2,
          description: "Item 2",
          price: 100,
        },
      },
    ],
  });
  await orderRepository.save(order1);
  await orderRepository.save(order2);
  const useCase = new FetchOrders(orderRepository);
  const output = await useCase.execute();
  expect(output).toStrictEqual({
    orders: [
      {
        code: order1.code,
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
      },
      {
        code: order2.code,
        total: 240,
        orderItems: [
          {
            quantity: 2,
            item: {
              decription: "Item 1",
              price: 70,
            },
          },
          {
            quantity: 1,
            item: {
              decription: "Item 2",
              price: 100,
            },
          },
        ],
      },
    ],
  });
});
