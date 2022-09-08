import {Router, Request, Response, NextFunction} from 'express'

export type CreateAppSettings = {
    port: number,
    routers: IRoute[],
    middlewares: Middleware[]
}

export interface IRoute {
    path: string,
    router: Router
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;