const { validateCpf } = require("./validate-cpf");

exports.OrderSummmary = class OrderSummmary {  
    constructor(order, discount, total)  { 
        this.order = order;
        this.discount = discount;
        this.total = total;
    }
}