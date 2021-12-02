export class Coupon {
  constructor(
    private code: string,
    private discountPercentage: number,
  ) {}

  getDiscountValue(total: number): number {
    return total * this.discountPercentage;
  }
}