import EntityValidationError from '@core/@seedwork/errors/EntityValidationError';
import Log from '../Log';

describe('Log integration tests: Success cases.', () => {
  it('Should not throw exception when creating log with correct properties.', () => {
    expect(() => {
      new Log({
        equipmentId: '{9b8ecf55-94fa-4e3b-ba41-3d635690bbea}',
        log: '00:00-ANSA',
        createdAt: new Date(),
      });
    }).not.toThrow();
  });

  it('Should not throw exception when updating log with correct properties.', () => {
    const log = new Log({
      equipmentId: '{9b8ecf55-94fa-4e3b-ba41-3d635690bbea}',
      log: '00:00-ANSA',
      createdAt: new Date(),
    });

    expect(() => {
      log.update({
        equipmentId: '{9b8ecf55-94fa-4e3b-ba41-3d635690bbea}',
        log: '00:00-ANSA',
        createdAt: new Date(),
      });
    }).not.toThrow();
  });
});

describe('Log integration tests: Unsuccess cases.', () => {
  it('Should throw exception when creating log with incorrect properties.', () => {
    let thrownError: EntityValidationError;

    try {
      new Log({
        equipmentId: undefined,
        log: '00:00-ANSA',
        createdAt: new Date(),
      });
    } catch (err: any) {
      thrownError = err;
    }

    expect(thrownError.name).toBe('EntityValidationError');
    expect(thrownError.error).toStrictEqual({
      equipmentId: [
        'equipmentId must be shorter than or equal to 38 characters',
        'equipmentId must be a string',
        'equipmentId should not be empty',
      ],
    });
  });

  it('Should throw exception when updating log with incorrect properties.', () => {
    let thrownError: EntityValidationError;

    const log = new Log({
      equipmentId: '{9b8ecf55-94fa-4e3b-ba41-3d635690bbea}',
      log: '00:00-ANSA',
      createdAt: new Date(),
    });

    try {
      log.update({
        equipmentId: '{9b8ecf55-94fa-4e3b-ba41-3d635690bbea}',
        log: undefined,
        createdAt: new Date(),
      });
    } catch (err: any) {
      thrownError = err;
    }

    expect(thrownError.name).toBe('EntityValidationError');
    expect(thrownError.error).toStrictEqual({
      log: ['log must be a string', 'log should not be empty'],
    });
  });
});
