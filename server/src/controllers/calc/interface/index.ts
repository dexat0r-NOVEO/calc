import { Request, Response } from "express";
export interface ICalcController {
    calculate: (req: Request, res: Response) => void;
}