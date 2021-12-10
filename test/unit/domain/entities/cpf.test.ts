import {CPF} from "../../../../src/domain/entities/cpf";

test("Deve lançar erro para cpf inválido com mesmo dígito:", function () {
	const cpf = "111.111.111-11";
	expect(() => new CPF(cpf)).toThrowError("Invalid CPF");
});

test("Deve lançar erro para cpf inválido:", function () {
	const cpf = "123.456.789-99";
	expect(() => new CPF(cpf)).toThrowError("Invalid CPF");
});

test("Dever lançar erro para cpf inválido com caracter não numérico:", function () {
	const cpf = "935.41a.347-80";
	expect(() => new CPF(cpf)).toThrowError("Invalid CPF");
});

test("Deve criar cpf válido:", function () {
	const cpf = "935.411.347-80";
	expect(() => new CPF(cpf)).not.toThrowError();
});