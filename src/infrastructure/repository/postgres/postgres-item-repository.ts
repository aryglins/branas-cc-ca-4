import { Pool } from 'pg';
import { Item } from '../../../domain/entities/item';
import { ItemMeasures } from '../../../domain/entities/item-measures';
import ItemRepository from '../../../domain/repositories/item-repository';

export default class PostgresItemRepository implements ItemRepository {
    private readonly db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    public async findBy(options: { id: number; }): Promise<Item | undefined> {
        const result = await this.db.query(
            `SELECT * FROM ccca.items WHERE id = $1`,
            [options.id],
        );
        if (result.rowCount === 0) {
            return undefined;
        }
        const item = result.rows[0];
        return new Item(
            item.id,
            item.description,
            item.price,
            new ItemMeasures(
                item.heigth,
                item.width,
                item.depth,
                item.weight,
            )
        );
    }
}