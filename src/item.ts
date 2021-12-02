export class Item {  
    public constructor(private readonly decription: string, private readonly price: number, private readonly quantity: number) {}

    public getTotalPrice(): number {
        return this.price * this.quantity;
    }
}