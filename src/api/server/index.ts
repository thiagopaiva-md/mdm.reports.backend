import express, { Express } from 'express';

import LogController from '@api/log/controller/LogController';
import EntityController from '@api/@shared/controller/EntityController';

class APIServer {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = +process.env.HTTP_PORT;

    this.initializeMiddlewares();

    const controllers = this.initializeControllers();
    this.associate(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeControllers(): EntityController[] {
    return [new LogController()];
  }

  private associate(controllers: EntityController[]): void {
    controllers.forEach(controller => {
      this.app.use(controller.getPath(), controller.router);
    });
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}.`);
    });
  }
}

export default APIServer;
