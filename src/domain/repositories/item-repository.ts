import { Item } from '../entities/item';

export default interface ItemRepository {
    findBy(options: {id: number}): Promise<Item | undefined>;
}