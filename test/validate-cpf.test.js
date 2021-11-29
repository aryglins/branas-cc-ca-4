const validate_cpf = require("../src/validate-cpf");

test("Deve retornar retornar false para cpf inválido: 111.111.111-11:", function () {
	const cpf = "111.111.111-11";
	const result = validate_cpf.validate_cpf(cpf);
	expect(result).toBeFalsy();	
});

test("Deve retornar retornar false para cpf inválido: 123.456.789-99:", function () {
	const cpf = "123.456.789-99";
	const result = validate_cpf.validate_cpf(cpf);
	expect(result).toBeFalsy();	
});

test("Deve retornar retornar false para cpf inválido: 935.41a.347-80:", function () {
	const cpf = "935.41a.347-80";
	const result = validate_cpf.validate_cpf(cpf);
	expect(result).toBeFalsy();	
});

test("Deve retornar retornar false para cpf inválido: null:", function () {
	const cpf = null;
	const result = validate_cpf.validate_cpf(cpf);
	expect(result).toBeFalsy();	
});

test("Deve retornar retornar false para cpf inválido: undefined:", function () {
	const cpf = undefined;
	const result = validate_cpf.validate_cpf(cpf);
	expect(result).toBeFalsy();	
});

test("Deve retornar retornar true para cpf válido: 935.411.347-80:", function () {
	const cpf = "935.411.347-80";
	const result = validate_cpf.validate_cpf(cpf);
	expect(result).toBeTruthy();	
});