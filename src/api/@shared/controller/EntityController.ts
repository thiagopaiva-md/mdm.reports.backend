import { Router } from 'express';

abstract class EntityController {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

  abstract getPath(): string;
}

export default EntityController;
