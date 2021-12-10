export class Coupon {
  constructor(
    private code: string,
    private discountPercentage: number,
    private expirationDate: Date
  ) {}

  getDiscountValue(total: number): number {
    return total * this.discountPercentage;
  }

  isExpired(): boolean {
    return this.expirationDate < new Date();
  }
}