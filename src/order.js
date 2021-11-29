const { validateCpf } = require("./validate-cpf");

exports.Order = class Order {  
    constructor(cpf, items)  { 
        this.cpf = cpf;
        this.items = items;
    }

    getTotal() {
        return 0;
    }
}