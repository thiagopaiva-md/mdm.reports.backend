import { container } from 'tsyringe';

import { Request, Response } from 'express';

import CreateLogUseCase from '@core/log/application/use-cases/CreateLogUseCase';
import GetLogUseCase from '@core/log/application/use-cases/GetLogUseCase';
import ListLogsUseCase from '@core/log/application/use-cases/ListLogsUseCase';
import EntityController from '@api/@shared/controller/EntityController';

class LogController extends EntityController {
  public createLogUseCase = container.resolve(CreateLogUseCase);

  public getLogUseCase = container.resolve(GetLogUseCase);

  public listLogsUseCase = container.resolve(ListLogsUseCase);

  protected initializeRoutes(): void {
    this.router.get('/', this.findAll.bind(this));
    this.router.post('/', this.create.bind(this));
  }

  getPath(): string {
    return '/log';
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.createLogUseCase.execute(request.body);
      return response.json(data);
    } catch (err: any) {
      return response.status(400).json({ name: err.name, msg: err.error });
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const data = await this.getLogUseCase.execute({ id });
    return response.json(data);
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const data = await this.listLogsUseCase.execute(request.body);
    return response.json(data);
  }
}

export default LogController;
