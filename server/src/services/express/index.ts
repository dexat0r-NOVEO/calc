import express, { Application } from "express"
import { CreateAppSettings, IRoute, Middleware } from "./interface";

export default class App {
    app: Application
    port: number
    constructor(op: CreateAppSettings) {
        this.app = express();
        this.port = op.port;
        this.middleWares(op.middlewares);
        this.routes(op.routers);
    }

    private middleWares(middleWares: Middleware[]): void {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    private routes(routes: IRoute[]): void {
        routes.forEach(route => {
            this.app.use(route.path || '/', route.router)
        });
    }

    public async listen(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port, () => {
                console.log(`App listening on the http://localhost:${this.port}`);
                resolve();
            });
        });
    }
}