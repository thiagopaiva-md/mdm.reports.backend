import 'reflect-metadata';
import { container } from 'tsyringe';

import { getMockReq, getMockRes } from '@jest-mock/express';

import LogController from '../LogController';
import CreateLogUseCase from '@core/log/application/use-cases/CreateLogUseCase';
import LogRepositoryInMemory from '@core/log/domain/repositories/InMemory/LogRepositoryInMemory';
import GetLogUseCase from '@core/log/application/use-cases/GetLogUseCase';
import ListLogsUseCase from '@core/log/application/use-cases/ListLogsUseCase';

describe('Log Controller unit tests.', () => {
  let controller: LogController;

  beforeEach(() => {
    container.register(CreateLogUseCase, {
      useFactory: () => {
        return new CreateLogUseCase(new LogRepositoryInMemory());
      },
    });

    container.register(GetLogUseCase, {
      useFactory: () => {
        return new GetLogUseCase(new LogRepositoryInMemory());
      },
    });

    container.register(ListLogsUseCase, {
      useFactory: () => {
        return new ListLogsUseCase(new LogRepositoryInMemory());
      },
    });

    controller = new LogController();
  });

  it('Should set path property to "/log".', () => {
    const path = controller.getPath();

    expect(path).toBe('/log');
  });

  it('Should be able to create a new Log.', async () => {
    const request = getMockReq({
      body: {
        equipmentId: '1234',
        log: '00:00-ANSA',
      },
    });
    const { res } = getMockRes();

    const log = await controller.create(request, res);

    expect(log.json).toHaveBeenCalledWith(
      expect.objectContaining({
        equipmentId: '1234',
        log: '00:00-ANSA',
      }),
    );
  });

  it('Should return error with incorrect parameters.', async () => {
    const request = getMockReq({
      body: {
        log: '00:00-ANSA',
      },
    });
    const { res } = getMockRes();

    const log = await controller.create(request, res);

    expect(log.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: {
          equipmentId: [
            'equipmentId must be shorter than or equal to 38 characters',
            'equipmentId must be a string',
            'equipmentId should not be empty',
          ],
        },
        name: 'EntityValidationError',
      }),
    );
  });
});
