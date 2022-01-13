import CouponRepository from '../repositories/coupon-repository';
import ItemRepository from '../repositories/item-repository';
import OrderRepository from '../repositories/order-repository';

export default interface RepositoryFactory  {
    createOrderRepository(): OrderRepository;
    createItemRepository(): ItemRepository;
    createCouponRepository(): CouponRepository;
}