import { ItemMeasures } from './item-measures';

const MIN_SHIPPING_COST_PRICE = 10;
export class Item {
    public constructor(private readonly decription: string, private readonly price: number, private readonly itemMeasures?: ItemMeasures) {}

    getPrice() {
        return this.price;
    }

    getShippingCost(): number {
        if(!this.itemMeasures){
            return 0;
        }
        const shippingCost = 1000 * this.itemMeasures.getVolume() * this.itemMeasures.getDensity()/100;
        return shippingCost < MIN_SHIPPING_COST_PRICE ? MIN_SHIPPING_COST_PRICE : shippingCost;
    } 
}