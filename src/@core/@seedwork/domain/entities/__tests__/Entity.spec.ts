import Entity from '../Entity';

class StubEntity extends Entity {}

describe('Entity unit tests', () => {
  it('Should create a new instance of Entity with all correct properties.', () => {
    const createdAt = new Date();
    const updatedAt = new Date();

    const entity = new StubEntity({
      id: '{0721779a-a8c9-4fc3-afe6-9da39a8d8532}',
      createdAt,
      updatedAt,
    });

    expect(entity.id).toBe('{0721779a-a8c9-4fc3-afe6-9da39a8d8532}');
    expect(entity.createdAt).toBe(createdAt);
    expect(entity.updatedAt).toBe(updatedAt);
  });

  it('Should create a new instance of Entity with missing optional params.', () => {
    const entity = new StubEntity();

    expect(entity.id).toBe(entity.props.id);
    expect(entity.createdAt).toBe(entity.props.createdAt);
    expect(entity.updatedAt).toBe(entity.props.updatedAt);
  });

  it('Should update an existing entity instance with all correct properties.', () => {
    const entity = new StubEntity({
      createdAt: new Date(),
    });

    const createdAt = new Date();
    const updatedAt = new Date();

    entity.update({
      id: '{0721779a-a8c9-4fc3-afe6-9da39a8d8532}',
      createdAt,
      updatedAt,
    });

    expect(entity.id).toBe('{0721779a-a8c9-4fc3-afe6-9da39a8d8532}');
    expect(entity.createdAt).toBe(createdAt);
    expect(entity.updatedAt).toBe(updatedAt);
  });
});
