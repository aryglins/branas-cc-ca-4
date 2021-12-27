export default interface FetchOrderByCodeOutput {
    code: string;
    total: number;
    orderItems: Array<{quantity: number; item: {decription: string; price: number}}>;
}