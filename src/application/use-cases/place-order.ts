import { Item } from '../../domain/entities/item';
import { Order } from '../../domain/entities/order';
import RepositoryFactory from '../../domain/factories/repository-factory';
import CouponRepository from '../../domain/repositories/coupon-repository';
import ItemRepository from '../../domain/repositories/item-repository';
import OrderRepository from '../../domain/repositories/order-repository';
import PlaceOrderInput from '../io/place-order-input';
import PlaceOrderOutput from '../io/place-order-output';

export default class PlaceOrder {
  private _orderRepository: OrderRepository;
  private _itemRepository: ItemRepository;
  private _couponRepository: CouponRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this._orderRepository = repositoryFactory.createOrderRepository();
    this._itemRepository = repositoryFactory.createItemRepository();
    this._couponRepository = repositoryFactory.createCouponRepository();
  }

  public async execute(placeOrderInput: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(placeOrderInput.cpf, placeOrderInput.date);
    for(const orderItemsInput of placeOrderInput.orderItems) {
      const item = await this._itemRepository.findBy({ id: orderItemsInput.id });
      if(!item) throw new Error('Item not found');
      order.addItem(item, orderItemsInput.quantity);
    }
    if(placeOrderInput.coupon) {
      const coupon = await this._couponRepository.findBy({ code: placeOrderInput.coupon.code });
      if(coupon) order.applyCoupon(coupon);
    }
    order.generateCode(this._orderRepository.seqNextVal());
    await this._orderRepository.save(order);
    return Promise.resolve({total: order.getTotal(), code: order.code});
  }
}
