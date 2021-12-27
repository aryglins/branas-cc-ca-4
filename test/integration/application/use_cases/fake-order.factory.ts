import { Item } from "../../../../src/domain/entities/item";
import { Order } from "../../../../src/domain/entities/order";

export default function createFakeOrder({
  sequence,
  cpf,
  orderItems,
}: {
  sequence: number;
  cpf: string;
  orderItems: {
    quantity: number;
    item: {
      id: number;
      description: string;
      price: number;
    };
  }[];
}): Order {
  const order = new Order(cpf);
  order.generateCode(sequence);
  orderItems.forEach((orderItem) => {
    order.addItem(
      new Item(
        orderItem.item.id,
        orderItem.item.description,
        orderItem.item.price
      ),
      orderItem.quantity
    );
  });
  return order;
}
