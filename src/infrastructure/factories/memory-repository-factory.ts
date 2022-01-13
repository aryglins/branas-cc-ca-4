import RepositoryFactory from '../../domain/factories/repository-factory';
import CouponRepository from '../../domain/repositories/coupon-repository';
import ItemRepository from '../../domain/repositories/item-repository';
import OrderRepository from '../../domain/repositories/order-repository';
import CouponRepositoryMemory from '../repository/memory/coupon-repository-memory';
import ItemRepositoryMemory from '../repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../repository/memory/order-repository-memory';

export default class MemoryRepositoryFactory implements RepositoryFactory {
    public createOrderRepository(): OrderRepository {
        return new OrderRepositoryMemory();
    }
    public createItemRepository(): ItemRepository {
        return new ItemRepositoryMemory();
    }
    public createCouponRepository(): CouponRepository {
        return new CouponRepositoryMemory();
    }
}