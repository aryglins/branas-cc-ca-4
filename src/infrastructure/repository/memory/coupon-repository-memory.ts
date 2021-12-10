import { Coupon } from '../../../domain/entities/coupon';
import CouponRepository from '../../../domain/repositories/coupon-repository';

export default class CouponRepositoryMemory implements CouponRepository {
    coupons: Coupon[];

    constructor() {
        const couponExpirationDate = new Date();
        couponExpirationDate.setDate(couponExpirationDate.getDate() + 1); // tomorrow
        this.coupons = [
            new Coupon('DESCONTO10', 0.1, couponExpirationDate), 
            new Coupon('DESCONTO102020', 0.1, new Date('2020-12-31')),
        ];
    }

    findBy(options: { code: string; }): Promise<Coupon | undefined>{
       return Promise.resolve(this.coupons.find(coupon => coupon.code === options.code));
    }

}