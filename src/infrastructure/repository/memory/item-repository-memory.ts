import { Item } from '../../../domain/entities/item';
import { ItemMeasures } from '../../../domain/entities/item-measures';
import ItemRepository from '../../../domain/repositories/item-repository';


export default class ItemRepositoryMemory implements ItemRepository {
    private readonly Items: Item[];

    constructor() {
        this.Items = [
            new Item(1, "Notebook", 1000, new ItemMeasures(20, 20, 3, 1)),
            new Item(2, "Monitor", 200, new ItemMeasures(30, 40, 5, 2.5)),
            new Item(3, "Mouse", 40, new ItemMeasures(10, 5, 2, 0.03)),
        ];
    }

    findBy(options: { id: number; }): Promise<Item | undefined> {
        return Promise.resolve(this.Items.find(item => item.id === options.id));
    }
}