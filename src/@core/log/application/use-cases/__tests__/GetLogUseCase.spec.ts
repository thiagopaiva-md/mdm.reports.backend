import Log from '@core/log/domain/entities/Log';
import LogRepositoryInMemory from '@core/log/domain/repositories/InMemory/LogRepositoryInMemory';
import GetLogUseCase from '../GetLogUseCase';

describe('GetLogUseCase unit tests.', () => {
  let logRepository: LogRepositoryInMemory;
  let getLogUseCase: GetLogUseCase;

  beforeAll(() => {
    logRepository = new LogRepositoryInMemory();

    getLogUseCase = new GetLogUseCase(logRepository);
  });
  it('Should Get a Log.', async () => {
    logRepository.items = [
      new Log({
        equipmentId: '9500cbbd-1162-48b9-85b3-1ae99d4bf918',
        log: '00:00-ANSA',
      }),
    ];

    const spyInsert = jest.spyOn(logRepository, 'findById');

    const log = await getLogUseCase.execute({
      id: logRepository.items[0].id,
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

  it('Should return null if id is not found.', async () => {
    const spyInsert = jest.spyOn(logRepository, 'findById');

    const log = await getLogUseCase.execute({
      id: 'unexistent-id',
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(log).toBeNull();
  });
});
