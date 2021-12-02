export class Item { 
    public constructor(private readonly decription: string, private readonly price: number) {}

    getPrice() {
        return this.price;
    } 
}