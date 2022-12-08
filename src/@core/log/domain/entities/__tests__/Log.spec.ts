import Log from '../Log';

describe('Log unit tests.', () => {
  it('Should create a new Log with all properties.', () => {
    const log = new Log({
      equipmentId: '{c2802455-9f13-49ca-91de-601a2784de18}',
      log: '00:00-ANSA',
      createdAt: new Date(),
    });

    expect(log.equipmentId).toBe('{c2802455-9f13-49ca-91de-601a2784de18}');
    expect(log.log).toBe('00:00-ANSA');
  });

  it('Should update an existing Log with all properties.', () => {
    const createdAt = new Date();

    const log = new Log({
      equipmentId: '{c2802455-9f13-49ca-91de-601a2784de18}',
      log: '00:00-ANSA',
      createdAt,
    });

    log.update({
      equipmentId: '{9b8ecf55-94fa-4e3b-ba41-3d635690bbea}',
      log: '00:00-ANSA;01:00-ANSA',
      createdAt,
    });

    expect(log.equipmentId).toBe('{9b8ecf55-94fa-4e3b-ba41-3d635690bbea}');
    expect(log.log).toBe('00:00-ANSA;01:00-ANSA');
  });
});
