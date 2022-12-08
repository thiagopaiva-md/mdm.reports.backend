import Log from '@core/log/domain/entities/Log';
import LogRepositoryInMemory from '../LogRepositoryInMemory';

describe('LogRepositoryInMemory unit tests.', () => {
  let repository: LogRepositoryInMemory;

  beforeEach(() => {
    repository = new LogRepositoryInMemory();
  });
  it('Should apply filter.', async () => {
    const items = [
      new Log({
        equipmentId: 'fd61e1e1-9977-4fa2-ae22-18b6fa6f1e8c',
        log: '00:00-ANSA',
      }),
      new Log({
        equipmentId: '9500cbbd-1162-48b9-85b3-1ae99d4bf918',
        log: '01:00-ANCA',
      }),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');

    let filteredItems = await repository['doFilter'](items, 'ANSA');
    expect(filteredItems).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);

    filteredItems = await repository['doFilter'](items, 'ANCA');
    expect(filteredItems).toStrictEqual([items[1]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(2);

    filteredItems = await repository['doFilter'](items, 'no-filter');
    expect(filteredItems).toHaveLength(0);
    expect(spyFilterMethod).toHaveBeenCalledTimes(3);
  });
});
