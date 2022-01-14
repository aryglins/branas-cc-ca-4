import { ItemMeasures } from './item-measures';

const MIN_SHIPPING_COST_PRICE = 10;
export class Item {
    public constructor(readonly id:number, readonly decription: string, readonly price: number, readonly itemMeasures?: ItemMeasures) {}

    getPrice() {
        return this.price;
    }

    getShippingCost(): number {
        if(!this.itemMeasures) {
            return 0;
        }
        const shippingCost = 1000 * this.itemMeasures.getVolume() * this.itemMeasures.getDensity()/100;
        console.log(shippingCost);
        return shippingCost < MIN_SHIPPING_COST_PRICE ? MIN_SHIPPING_COST_PRICE : shippingCost;
    } 
}