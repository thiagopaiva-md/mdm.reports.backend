import EntityValidationError from '@core/@seedwork/errors/EntityValidationError';
import Entity from '../Entity';

class StubEntity extends Entity {}

describe('Entity integration tests.', () => {
  describe('Correct params: no exception thrown.', () => {
    it('Should create a new Entity with correct properties.', () => {
      expect(() => {
        new StubEntity({
          id: '{0721779a-a8c9-4fc3-afe6-9da39a8d8532}',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }).not.toThrow();
    });

    it('Should update an existing Entity with correct properties.', () => {
      const entity = new StubEntity({
        id: '{0721779a-a8c9-4fc3-afe6-9da39a8d8532}',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(() => {
        entity.update({
          id: '{0721779a-a8c9-4fc3-afe6-9da39a8d8532}',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }).not.toThrow();
    });

    it('Should create a new Entity with no properties (They are all optional).', () => {
      expect(() => {
        new StubEntity({});
      }).not.toThrow();
    });

    it('Should update an existing Entity with no properties (They are all optional).', () => {
      const entity = new StubEntity();

      expect(() => {
        entity.update({ id: entity.id });
      }).not.toThrow();
    });
  });

  describe('Incorrect params: Must throw exception "EntityValidationError".', () => {
    it('Should throw validation error when id is not a string.', () => {
      let thrownError: EntityValidationError;

      try {
        new StubEntity({
          id: 5 as any,
        });
      } catch (err: any) {
        thrownError = err;
      }

      expect(thrownError.name).toBe('EntityValidationError');
      expect(thrownError.error).toStrictEqual({
        id: [
          'id must be shorter than or equal to 38 characters',
          'id must be a string',
        ],
      });
    });
  });
});
