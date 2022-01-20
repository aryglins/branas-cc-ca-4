import express from "express";
import PlaceOrder from './application/use-cases/place-order';
import PostgresRepositoryFactory from './infrastructure/factories/postgres-repository-factory';

const app = express();
const repositoryFactory = new PostgresRepositoryFactory()

app.use(express.json());

app.post("/orders", async function (req, res){
    const placeOrder = new PlaceOrder(repositoryFactory)
    const input = req.body
    input.date = new Date(input.date)
    const output = await placeOrder.execute(req.body);
    res.json(output);
});

app.listen(3000);