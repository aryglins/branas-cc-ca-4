const { validateCpf } = require("./validate-cpf");

exports.Order = class Order {  
    constructor(cpf, items)  { 
        this.cpf = cpf;
        this.items = items;
    }

    getTotal(discount) {
        return this.items.reduce((total, item) => total + item.price*item.quantity, 0) * (1 - discount);
    }
}