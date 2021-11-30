const { OrderSummmary } = require("./order-summary");
const { validateCpf } = require("./validate-cpf");

exports.OrderService = class OrderService {
    
    makeOrder(order, discount) {
        if(!validateCpf(order.cpf)) {
            throw new Error("CPF inválido");
        }
        return new OrderSummmary(order, discount, order.getTotal(discount));
    }
}