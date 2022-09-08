import { ICalcService } from "services/calc/interface";
import { ICalcController } from "./interface";
import { Request, Response } from "express";
import createHttpError from "http-errors";

export default class CalcController implements ICalcController{
    constructor(
        private readonly calc: ICalcService
    ) {}

    calculate = async (req: Request, res: Response) => {
        try {
            const expression = req.body.expression;
            if (!expression) throw new createHttpError.BadRequest("No expression provided!");            
            const result = this.calc.calculate(expression.toString());
            return res.status(200).json({
                status: true,
                answer: result
            });
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message
            });
        }
    }
}