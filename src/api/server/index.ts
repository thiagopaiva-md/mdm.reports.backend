import express, { Express } from 'express';

import LogController from '@api/log/controller/LogController';

class APIServer {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = +process.env.HTTP_PORT;

    this.initializeMiddlewares();
    this.initializeControllers();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeControllers(): void {
    const logController = new LogController();

    this.app.use(logController.path, logController.router);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}.`);
    });
  }
}

export default APIServer;
