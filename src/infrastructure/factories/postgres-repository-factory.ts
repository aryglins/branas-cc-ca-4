import { Pool } from 'pg';
import RepositoryFactory from '../../domain/factories/repository-factory';
import CouponRepository from '../../domain/repositories/coupon-repository';
import ItemRepository from '../../domain/repositories/item-repository';
import OrderRepository from '../../domain/repositories/order-repository';
import PostgresCouponRepository from '../repository/postgres/postgres-coupon-repository';
import PostgresItemRepository from '../repository/postgres/postgres-item-repository';
import PostgresOrderRepository from '../repository/postgres/postgres-order-repository';

export default class PostgresRepositoryFactory implements RepositoryFactory {
    private readonly db: Pool;

    constructor() {
        this.db = new Pool({
                host: 'localhost',
                port: 5432,
                user: 'user',
                password: 'password',
                database: 'database',
            }
        );
    }

    public createOrderRepository(): OrderRepository {
        return new PostgresOrderRepository(this.db);
    }

    public createItemRepository(): ItemRepository {
        return new PostgresItemRepository(this.db);
    }

    public createCouponRepository(): CouponRepository {
        return new PostgresCouponRepository(this.db);
    }
}