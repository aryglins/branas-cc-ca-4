import { Order } from './order';
import { OrderSummmary } from "./order-summary";
import { validateCpf } from "./validate-cpf";

export class OrderService {
    makeOrder(order: Order, discount: number) {
        if(!validateCpf(order.getCpf())) {
            throw new Error("CPF inválido");
        }
        return new OrderSummmary(order, discount, order.getTotal(discount));
    }
}