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
    private readonly orderRepository;
    private readonly itemRepository;
    private readonly couponRepository;

    constructor() {
        this.db = new Pool({
                host: 'localhost',
                port: 5432,
                user: 'user',
                password: 'password',
                database: 'database',
            }
        );
        this.orderRepository = new PostgresOrderRepository(this.db);
        this.itemRepository = new PostgresItemRepository(this.db);
        this.couponRepository = new PostgresCouponRepository(this.db);
    }

    public createOrderRepository(): OrderRepository {
        return this.orderRepository;
    }

    public createItemRepository(): ItemRepository {
        return this.itemRepository;
    }

    public createCouponRepository(): CouponRepository {
        return this.couponRepository;
    }
}