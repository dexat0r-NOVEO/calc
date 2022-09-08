import App from './services/express';
import CalcService from './services/calc';
import CalcController from './controllers/calc';
import CalcRouter from './routers/calc';
import express from 'express';

async function main() {

    const calcService = new CalcService();
    const calcController = new CalcController(calcService);
    const calcRouter = new CalcRouter(calcController);

    const app = new App({
        port: 3000,
        routers: [
            calcRouter
        ],
        middlewares: [
            express.json()
        ]
    });

    await app.listen();
}

main();