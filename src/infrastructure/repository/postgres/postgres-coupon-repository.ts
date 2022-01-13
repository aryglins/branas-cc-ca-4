import { Coupon } from '../../../domain/entities/coupon';
import CouponRepository from '../../../domain/repositories/coupon-repository';
import { Pool } from 'pg';

export default class PostgresCouponRepository implements CouponRepository {
    private readonly db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    public async findBy(options: { code: string; }): Promise<Coupon | undefined> {
        const result = await this.db.query(
            `SELECT * FROM ccca.coupons WHERE code = $1`,
            [options.code],
        );
        if (result.rowCount === 0) {
            return undefined;
        }
        const coupon = result.rows[0];
        return new Coupon(
            coupon.id,
            coupon.code,
            coupon.discount_percentage,
            new Date(coupon.expiration_date),
        );
    }
}