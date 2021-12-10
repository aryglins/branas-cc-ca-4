import ValidateCoupon from '../../../../src/application/use-cases/validate-coupon';
import CouponRepositoryMemory from '../../../../src/infrastructure/repository/memory/coupon-repository-memory';

test('Deve retornar true para cupom de desconto válido', async () => {
    const code = 'DESCONTO10'
    const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory());
    const result = await validateCoupon.execute(code);
    expect(result).toStrictEqual({
        isValid: true,
        message: 'Cupom de desconto válido'
    });
});

test('Deve retornar false para cupom de desconto expirado', async () => {
    const code = 'DESCONTO102020'
    const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory());
    const result = await validateCoupon.execute(code);
    expect(result).toStrictEqual({
        isValid: false,
        message: 'Cupom de desconto expirado'
    });
});

test('Deve retornar false para cupom de desconto inexistente', async () => {
    const code = 'DESCONTO123'
    const validateCoupon = new ValidateCoupon(new CouponRepositoryMemory());
    const result = await validateCoupon.execute(code);
    expect(result).toStrictEqual({
        isValid: false,
        message: 'Cupom de desconto inexistente'
    });
});