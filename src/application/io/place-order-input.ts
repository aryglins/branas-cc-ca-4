export default interface PlaceOrderInput {
    cpf: string;
    orderItems: {id: number; quantity: number}[];
    coupon?: {code: string};
    date?: Date;
}
