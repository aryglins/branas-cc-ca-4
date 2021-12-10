import { Coupon } from '../entities/coupon';

export default interface CouponRepository {
    findBy(options: {code: string}): Promise<Coupon | undefined>;
}