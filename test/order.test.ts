import { Coupon } from '../src/coupon';
import { Item } from '../src/item';
import { Order } from '../src/order';
const ONE_DAY_IN_MILISSECONDS = 1000 * 60 * 60 * 24;

test("Deve criar um pedido vazio com CPF válido", () => {
    const order = new Order("123.456.789-09");
    const total = order.getTotal();
    expect(total).toBe(0);
});

test("Não deve criar um pedido com CPF inválido", () => {
    expect(() => new Order("123.456.789-90")).toThrow(new Error('Invalid CPF'));
});

test("Deve criar um pedido com 3 items: descrição, preço e quantidade", () => {
    const order = new Order("123.456.789-09");
    order.addItem(new Item("Notebook", 1000), 1);
    order.addItem(new Item("Monitor", 200), 2);
    order.addItem(new Item("Mouse", 40), 1);
    expect(order.getTotal()).toBe(1440);
});

test("Deve criar um pedido com cupom de desconto válido", () => {
    const order = new Order("123.456.789-09");
    order.addItem(new Item("Notebook", 1000), 1);
    order.addItem(new Item("Monitor", 200), 2);
    order.addItem(new Item("Mouse", 40), 1);
    const futureDate = new Date(new Date().getTime() + ONE_DAY_IN_MILISSECONDS);
    order.addCoupon(new Coupon("DESCONTO10", 0.1, futureDate));
    expect(order.getTotal()).toBe(1440 - (1440 * 0.1));
});

test("Não criar um pedido com cupom de desconto expirado", () => {
    const order = new Order("123.456.789-09");
    order.addItem(new Item("Notebook", 1000), 1);
    order.addItem(new Item("Monitor", 200), 2);
    order.addItem(new Item("Mouse", 40), 1);
    const pastDate = new Date(new Date().getTime() - ONE_DAY_IN_MILISSECONDS);
    expect(() => order.addCoupon(new Coupon("DESCONTO10", 0.1, pastDate))).toThrow(new Error('Coupon expired'));
});