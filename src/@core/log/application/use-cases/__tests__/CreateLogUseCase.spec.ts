import LogRepositoryInMemory from '@core/log/domain/repositories/InMemory/LogRepositoryInMemory';
import CreateLogUseCase from '../CreateLogUseCase';

describe('CreateLogUseCase unit tests.', () => {
  let logRepository: LogRepositoryInMemory;
  let createLogUseCase: CreateLogUseCase;

  beforeAll(() => {
    logRepository = new LogRepositoryInMemory();

    createLogUseCase = new CreateLogUseCase(logRepository);
  });
  it('Should create a new Log.', async () => {
    const spyInsert = jest.spyOn(logRepository, 'insert');

    const log = await createLogUseCase.execute({
      equipmentId: '9500cbbd-1162-48b9-85b3-1ae99d4bf918',
      log: '00:00-ANSA',
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(log).toStrictEqual({
      id: logRepository.items[0].id,
      equipmentId: '9500cbbd-1162-48b9-85b3-1ae99d4bf918',
      log: '00:00-ANSA',
      createdAt: logRepository.items[0].createdAt,
      updatedAt: logRepository.items[0].updatedAt,
    });
  });
});
