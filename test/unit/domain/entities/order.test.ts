import { Coupon } from '../../../../src/domain/entities/coupon';
import { Item } from '../../../../src/domain/entities/item';
import { ItemMeasures } from '../../../../src/domain/entities/item-measures';
import { Order } from '../../../../src/domain/entities/order';

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
    order.addItem(new Item(1, "Notebook", 1000), 1);
    order.addItem(new Item(2, "Monitor", 200), 2);
    order.addItem(new Item(3, "Mouse", 40), 1);
    expect(order.getTotal()).toBe(1440);
});

test("Deve criar um pedido com cupom de desconto válido", () => {
    const order = new Order("123.456.789-09");
    order.addItem(new Item(1, "Notebook", 1000), 1);
    order.addItem(new Item(2, "Monitor", 200), 2);
    order.addItem(new Item(3, "Mouse", 40), 1);
    const futureDate = new Date(new Date().getTime() + ONE_DAY_IN_MILISSECONDS);
    order.applyCoupon(new Coupon("DESCONTO10", 0.1, futureDate));
    expect(order.getTotal()).toBe(1440 - (1440 * 0.1));
});

test("Não criar um pedido com cupom de desconto expirado", () => {
    const order = new Order("123.456.789-09");
    order.addItem(new Item(1, "Notebook", 1000), 1);
    order.addItem(new Item(2, "Monitor", 200), 2);
    order.addItem(new Item(3, "Mouse", 40), 1);
    const pastDate = new Date(new Date().getTime() - ONE_DAY_IN_MILISSECONDS);
    expect(() => order.applyCoupon(new Coupon("DESCONTO10", 0.1, pastDate))).toThrow(new Error('Coupon expired'));
});

test("Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)", () => {
    const order = new Order("123.456.789-09");
    order.addItem(new Item(1, "Notebook", 1000, new ItemMeasures(20, 20, 3, 1)), 1);
    order.addItem(new Item(2, "Monitor", 200, new ItemMeasures(30, 40, 5, 2.5)), 2);
    order.addItem(new Item(3, "Mouse", 40, new ItemMeasures(10, 5, 2, 0.03)), 1);
    /*
    * Notebook volume: 20cm x 20cm x 3cm = 0,0012 m^3 
    * Notebook densidade: 1kg / 0,0012 m^3 = 833,34 kg / m^3
    * Notebook frete: 1000 * 0,0012 * 10/100 = 10
    * Monitor volume: 30cm x 40cm x 5cm = 0,006 m^3
    * Monitor densidade: 2,5kg / 0,006 m^3 = 416,67 kg / m^3
    * Monitor frete: 1000 * 0,006 * 416,67/100 = 25
    * Mouse volume: 10cm x 5cm x 2cm = 0,0001 m^3
    * Mouse densidade: 0,03kg / 0,0001 m^3 = 300 kg / m^3
    * Mouse frete: 1000 * 0,0001 * 300/100 = 0,3 (valor < 10, então frete = 10)
    * Total: 10 + 2*25 + 10 = 70
    */
    expect(order.getTotal()).toBe(1440 + 70);
});
