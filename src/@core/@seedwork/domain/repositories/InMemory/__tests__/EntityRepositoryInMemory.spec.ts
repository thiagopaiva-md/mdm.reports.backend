import Entity from '@core/@seedwork/domain/entities/Entity';
import EntityNotFoundError from '@core/@seedwork/errors/EntityNotFoundError';
import EntityRepositoryInMemory from '../EntityRepositoryInMemory';

class StubEntity extends Entity {}

class StubEntityRepositoryInMemory extends EntityRepositoryInMemory<StubEntity> {}

describe('EntityRepositoryInMemory unit tests.', () => {
  let repository: StubEntityRepositoryInMemory;

  beforeEach(() => {
    repository = new StubEntityRepositoryInMemory();
  });

  it('Should insert a new entity.', async () => {
    const entity = new StubEntity({
      createdAt: new Date(),
    });

    await repository.insert(entity);

    expect(entity).toStrictEqual(repository.items[0]);
  });

  it('Should try to find an entity and return null if id does not exist.', () => {
    const ids = ['', '{12345}'];

    ids.forEach(async id => {
      const entity = await repository.findById(id);
      expect(entity).toBeNull();
    });
  });

  it('Should try to find an entity and return a valid one if id exists.', async () => {
    const entity = new StubEntity({ createdAt: new Date() });

    await repository.insert(entity);

    const foundEntity = await repository.findById(entity.id);

    expect(foundEntity).toStrictEqual(entity);
  });

  it('Should find all entities.', async () => {
    const entity = new StubEntity({ createdAt: new Date() });

    await repository.insert(entity);

    const all = await repository.findAll();

    expect(all).toStrictEqual([entity]);
  });

  it('Shoud throw an error when updating an inexistent id.', async () => {
    let thrownError: EntityNotFoundError;

    try {
      await repository.update(new StubEntity({ createdAt: new Date() }));
    } catch (err: any) {
      thrownError = err;
    }

    expect(thrownError.name).toBe('EntityNotFoundError');
  });

  it('Should update an entity correctly.', async () => {
    const entity = new StubEntity({ createdAt: new Date() });

    await repository.insert(entity);

    const updatedEntity = new StubEntity({
      id: entity.id,
      createdAt: new Date(),
    });

    await repository.update(updatedEntity);

    expect(repository.items[0]).toStrictEqual(updatedEntity);
  });

  it('Shoud throw an error when deleting an inexistent id.', async () => {
    let thrownError: EntityNotFoundError;

    try {
      await repository.delete('{12345}');
    } catch (err: any) {
      thrownError = err;
    }

    expect(thrownError.name).toBe('EntityNotFoundError');
  });

  it('Should delete an entity correctly.', async () => {
    const entity = new StubEntity({ createdAt: new Date() });

    await repository.insert(entity);

    await expect(repository.delete(entity.id)).resolves.not.toThrow();
  });
});
