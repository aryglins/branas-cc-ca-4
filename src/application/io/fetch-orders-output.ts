export default interface FetchOrdersOutput {
  orders: Array<{
    code: string;
    total: number;
    orderItems: Array<{
      quantity: number;
      item: { decription: string; price: number };
    }>;
  }>;
}
