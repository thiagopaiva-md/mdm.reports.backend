import EntityNotFoundError from '@core/@seedwork/errors/EntityNotFoundError';
import Entity from '../../entities/Entity';
import RepositoryInterface from '../contracts/RepositoryInterface';

abstract class EntityRepositoryInMemory<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string): Promise<E> {
    const found = this.items.find(item => item.id === id);

    return found || null;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const foundEntity = await this.findById(entity.id);

    if (!foundEntity) {
      throw new EntityNotFoundError(`Entity with ID ${entity.id} not found.`);
    }

    const idx = this.items.findIndex(item => item.id === entity.id);

    this.items[idx] = entity;
  }

  async delete(id: string): Promise<void> {
    const foundEntity = await this.findById(id);

    if (!foundEntity) {
      throw new EntityNotFoundError(`Entity with ID ${id} not found.`);
    }

    const idx = this.items.findIndex(item => item.id === id);

    this.items.splice(idx, 1);
  }
}

export default EntityRepositoryInMemory;
