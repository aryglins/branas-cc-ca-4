import CouponRepository from '../../domain/repositories/coupon-repository';
import ValidateCouponOutput from '../io/validate-coupon-output';

const NOT_FOUND_COUPON_MESSAGE = 'Cupom de desconto inexistente';
const EXPIRED_COUPON_MESSAGE = 'Cupom de desconto expirado';
export default class ValidateCoupon {
    constructor(private readonly couponRepository: CouponRepository) {}

    async execute(couponCode: string): Promise<ValidateCouponOutput> {
        const coupon = await this.couponRepository.findBy({code: couponCode});
        if(!coupon) return Promise.resolve({isValid: false, message: NOT_FOUND_COUPON_MESSAGE});
        if(coupon.isExpired()) return Promise.resolve({isValid: false, message: EXPIRED_COUPON_MESSAGE});
        return Promise.resolve({isValid: true, message: 'Cupom de desconto válido'});
    }
}