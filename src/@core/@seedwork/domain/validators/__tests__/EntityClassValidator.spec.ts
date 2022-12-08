import EntityClassValidator from '../EntityClassValidator';

describe('EntityClassValidator unit tests.', () => {
  let validator: EntityClassValidator;

  beforeEach(() => {
    validator = new EntityClassValidator();
  });

  describe('Success validation.', () => {
    it('Should validate with all correct properties.', () => {
      let isValid = validator.validate({
        id: '{0721779a-a8c9-4fc3-afe6-9da39a8d8532}',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(isValid).toBeTruthy();
      expect(validator.errors).toBeNull();
    });

    it('Should validate with optional properties missing.', () => {
      let isValid = validator.validate({});

      expect(isValid).toBeTruthy();
      expect(validator.errors).toBeNull();
    });
  });

  describe('Unsuccess validation.', () => {
    it('Should not validate with a non date type createdAt property.', () => {
      let isValid = validator.validate({
        createdAt: 5 as any,
      });

      expect(isValid).toBeFalsy();
      expect(validator.errors).toStrictEqual({
        createdAt: ['createdAt must be a Date instance'],
      });
    });

    it('Should not validate when id property is not a string.', () => {
      let isValid = validator.validate({
        id: 5 as any,
        createdAt: new Date(),
      });

      expect(isValid).toBeFalsy();
      expect(validator.errors).toStrictEqual({
        id: [
          'id must be shorter than or equal to 38 characters',
          'id must be a string',
        ],
      });
    });

    it('Should not validate when id property is greater than 38 characters.', () => {
      let isValid = validator.validate({
        id: '.'.repeat(50),
        createdAt: new Date(),
      });

      expect(isValid).toBeFalsy();
      expect(validator.errors).toStrictEqual({
        id: ['id must be shorter than or equal to 38 characters'],
      });
    });

    it('Should not validate with a non date type updatedAt property.', () => {
      let isValid = validator.validate({
        createdAt: new Date(),
        updatedAt: 5 as any,
      });

      expect(isValid).toBeFalsy();
      expect(validator.errors).toStrictEqual({
        updatedAt: ['updatedAt must be a Date instance'],
      });
    });
  });
});
