import express, { Router } from 'express'
import { IRoute } from 'services/express/interface'
import { ICalcController } from 'controllers/calc/interface';

export default class CalcRouter implements IRoute {
    path = '/calc';
    router = express.Router();

    constructor(
        private readonly controller: ICalcController
    ) {
        this.router.post('/', this.controller.calculate);
    }
}