import LogValidator from '../LogValidator';

describe('LogValidator unit tests: Success cases.', () => {
  let validator: LogValidator;
  beforeEach(() => {
    validator = new LogValidator();
  });
  it('Should validate with correct properties.', () => {
    const isValid = validator.validate({
      equipmentId: '{c2802455-9f13-49ca-91de-601a2784de18}',
      log: '00:00-ANSA',
    });

    expect(isValid).toBeTruthy();
    expect(validator.errors).toBeNull();
  });
});

describe('LogValidator unit tests: Unsuccess cases.', () => {
  let validator: LogValidator;
  beforeEach(() => {
    validator = new LogValidator();
  });
  it('Should not validate with missing equipmentId property.', () => {
    const isValid = validator.validate({
      equipmentId: undefined,
      log: '00:00-ANSA',
    });

    expect(isValid).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      equipmentId: [
        'equipmentId must be shorter than or equal to 38 characters',
        'equipmentId must be a string',
        'equipmentId should not be empty',
      ],
    });
  });

  it('Should not validate with missing log property.', () => {
    const isValid = validator.validate({
      equipmentId: '{c2802455-9f13-49ca-91de-601a2784de18}',
      log: undefined,
    });

    expect(isValid).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      log: ['log must be a string', 'log should not be empty'],
    });
  });

  it('Should not validate with no properties.', () => {
    const isValid = validator.validate({
      equipmentId: undefined,
      log: undefined,
    });

    expect(isValid).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      equipmentId: [
        'equipmentId must be shorter than or equal to 38 characters',
        'equipmentId must be a string',
        'equipmentId should not be empty',
      ],
      log: ['log must be a string', 'log should not be empty'],
    });
  });
});
