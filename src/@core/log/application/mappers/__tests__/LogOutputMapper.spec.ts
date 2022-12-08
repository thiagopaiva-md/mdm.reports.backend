import Log from '@core/log/domain/entities/Log';
import LogOutputMapper from '../LogOutputMapper';

describe('LogOutputMapper unit tests.', () => {
  it('Should map Log Entity to LogOutputDTO.', () => {
    const log = new Log({
      equipmentId: '36a18888-54ae-42b5-881e-c136ac4c6b17',
      log: '00:00-ANSA',
    });

    const mapper = LogOutputMapper.toOutput(log);

    expect(mapper).toStrictEqual({
      id: log.id,
      equipmentId: '36a18888-54ae-42b5-881e-c136ac4c6b17',
      log: '00:00-ANSA',
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    });
  });
});
