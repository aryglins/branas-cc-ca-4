const { OrderService } = require("../src/order-service");
const { Order } = require("../src/order");
const { Item } = require("../src/item");
const { OrderSummmary } = require("../src/order-summary");

const orderService = new OrderService();

test("Não deve fazer um pedido com cpf inválido: ", function () {
	const order = new Order("111.111.111-11", [new Item("1", "Notebook", 1, 2000)], 0);
    expect(() => orderService.makeOrder(order)).toThrow(Error);
});

test("Deve fazer um pedido com 3 itens (com descrição, preço e quantidade): ", function () {
	const order = new Order("123.456.789-09", [new Item("Notebook", 1, 2000), new Item("Mouse", 0.5, 2000), , new Item("Teclado", 0.25, 2000)]);
    const orderSummary = orderService.makeOrder(order, 0);
    expect(orderSummary).toEqual(new OrderSummmary(order, 0, 3500));
});

test("Deve fazer um pedido com cupom de desconto (percentual sobre o total do pedido): ", function () {
	const order = new Order("123.456.789-09", [new Item("Notebook", 1, 2000), new Item("Mouse", 0.5, 2000), , new Item("Teclado", 0.25, 2000)]);
    const orderSummary = orderService.makeOrder(order, 0.1);
    expect(orderSummary).toEqual(new OrderSummmary(order, 0.1, 3150));
});