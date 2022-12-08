import Log from '@core/log/domain/entities/Log';
import LogRepositoryInMemory from '@core/log/domain/repositories/InMemory/LogRepositoryInMemory';
import ListLogsUseCase from '../ListLogsUseCase';

describe('ListLogsUseCase unit tests.', () => {
  let LogRepository: LogRepositoryInMemory;
  let listLogsUseCase: ListLogsUseCase;

  beforeAll(() => {
    LogRepository = new LogRepositoryInMemory();

    listLogsUseCase = new ListLogsUseCase(LogRepository);
  });
  it('Should list logs.', () => {
    const items = [
      new Log({
        equipmentId: '36a18888-54ae-42b5-881e-c136ac4c6b17',
        log: '00:00-ANSA',
      }),
      new Log({
        equipmentId: '82876505-8040-491c-bdde-fbc3e037f221',
        log: '01:00-ANSA',
      }),
      new Log({
        equipmentId: '1437dace-0986-4f80-b220-ad0da07fa441',
        log: '02:00-ANSA',
      }),
    ];

    const mappedLogs = listLogsUseCase['mapItems'](items);

    expect(mappedLogs).toStrictEqual([
      {
        id: items[0].id,
        equipmentId: '36a18888-54ae-42b5-881e-c136ac4c6b17',
        log: '00:00-ANSA',
        createdAt: items[0].createdAt,
        updatedAt: items[0].updatedAt,
      },
      {
        id: items[1].id,
        equipmentId: '82876505-8040-491c-bdde-fbc3e037f221',
        log: '01:00-ANSA',
        createdAt: items[1].createdAt,
        updatedAt: items[1].updatedAt,
      },
      {
        id: items[2].id,
        equipmentId: '1437dace-0986-4f80-b220-ad0da07fa441',
        log: '02:00-ANSA',
        createdAt: items[2].createdAt,
        updatedAt: items[2].updatedAt,
      },
    ]);
  });
});
