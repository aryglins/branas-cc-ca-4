import { Pool } from 'pg';
import { Order } from '../../../domain/entities/order';
import { OrderItem } from '../../../domain/entities/order-item';
import OrderRepository from '../../../domain/repositories/order-repository';

export default class PostgresOrderRepository implements OrderRepository {
    private readonly db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    public async findBy(options: { code: string; }): Promise<Order | undefined> {
        const result = await this.db.query(
            `SELECT * FROM ccca.orders o INNER JOIN ccca.order_items oi on o.id = oi.order_id WHERE code = $1`,
            [options.code],
        );
        if (result.rowCount === 0) {
            return undefined;
        }
        const order = result.rows[0];
        return new Order(
            order.cpf,
            order.date,
            order.order_items.map((orderItem: any) => (new OrderItem(orderItem.item, orderItem.quantity))),
        );
    }

    public async findAll(): Promise<Order[]> {
        const result = await this.db.query(
            `SELECT * FROM ccca.orders`,
        );
        return result.rows.map((order) => new Order(
            order.cpf,
            order.date,
        ));
    }

    public async save(order: Order): Promise<Order> {
        const orderResult = await this.db.query(
            `INSERT INTO ccca.orders (cpf, date, code, coupon_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [order.cpf, order.date, order.code, order.coupon?.id],
        );

        let orderItemResult;
        for(const orderItem of order.getOrderItems()) {
            orderItemResult = await this.db.query(
                `INSERT INTO ccca.order_items (order_id, item_id, quantity) VALUES ($1, $2, $3)`,
                [orderResult.rows[0].id, orderItem.item.id, orderItem.quantity],
            );
        }
        return new Order(
            orderResult.rows[0].cpf,
            orderResult.rows[0].date,
            orderItemResult?.rows.map((orderItem: any) => (new OrderItem(orderItem.item, orderItem.quantity))),
        );
    }
    
    public async seqNextVal(): Promise<number> {
        const result = await this.db.query(
            `SELECT nextval('ccca.orders_code_seq')`,
        );
        return result.rows[0].nextval;
    }

    public async count(): Promise<number> {
        const result = await this.db.query(
            `SELECT COUNT(*) FROM ccca.orders`,
        );
        return Number(result.rows[0].count);
    }
}