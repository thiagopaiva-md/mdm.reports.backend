import Entity, {
  EntityProperties,
} from '@core/@seedwork/domain/entities/Entity';
import FilterInput from '@core/@seedwork/domain/entities/FilterInput';
import SearchableInput from '@core/@seedwork/domain/entities/SearchableInput';
import SearchableOutput from '@core/@seedwork/domain/entities/SearchableOutput';
import EntitySearchableRepositoryInMemory from '../EntitySearchableRepositoryInMemory';

interface StubProperties extends EntityProperties {
  name: string;
  age: number;
}

class StubEntity extends Entity<StubProperties> {
  name: string;
  age: number;

  constructor(public readonly props: StubProperties) {
    super(props);
    this.name = this.props.name;
    this.age = this.props.age;
  }
}

class StubEntitySearchableRepositoryInMemory extends EntitySearchableRepositoryInMemory<StubEntity> {
  sortableFields = ['name'];

  protected async filterItems(
    items: StubEntity[],
    filter: FilterInput[],
  ): Promise<StubEntity[]> {
    let tempItems = items;
    let value: any;

    filter.forEach(f => {
      tempItems = tempItems.filter(tempItem => {
        switch (f.field) {
          case 'name': {
            value = tempItem.name.toLowerCase();
            break;
          }
          case 'age': {
            value = tempItem.age;
            break;
          }
        }

        return this.testItemFilter(value, f);
      });
    });

    return tempItems;
  }
}

describe('EntitySearchableRepositoryInMemory unit tests.', () => {
  let repository: StubEntitySearchableRepositoryInMemory;

  beforeEach(() => {
    repository = new StubEntitySearchableRepositoryInMemory();
  });
  describe('applyFilter method tests.', () => {
    it('Should not filter items when filter param is null.', async () => {
      const items = [
        new StubEntity({ name: 'name', age: 37, createdAt: new Date() }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      const filteredItems = await repository['applyFilter'](items, null);

      expect(filteredItems).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('Should filter using a filter param.', async () => {
      const items = [
        new StubEntity({ name: 'test1', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'test11', age: 15, createdAt: new Date() }),
        new StubEntity({ name: 'test3', age: 55, createdAt: new Date() }),
      ];

      let filter = new FilterInput({
        field: 'name',
        operator: 'in',
        value: 'test1',
      });

      const spyFilterMethod = jest.spyOn(items, 'filter');

      let filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      filter = new FilterInput({
        field: 'name',
        operator: '=',
        value: 'test3',
      });

      filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toStrictEqual([items[2]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      filter = new FilterInput({
        field: 'name',
        operator: '=',
        value: 'no-filter',
      });

      filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);

      filter = new FilterInput({
        field: 'name',
        operator: '!=',
        value: 'thiago',
      });

      filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toHaveLength(3);
      expect(spyFilterMethod).toHaveBeenCalledTimes(4);

      filter = new FilterInput({
        field: 'age',
        operator: '>',
        value: 30,
      });

      filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toHaveLength(2);
      expect(spyFilterMethod).toHaveBeenCalledTimes(5);

      filter = new FilterInput({
        field: 'age',
        operator: '>=',
        value: 55,
      });

      filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toHaveLength(1);
      expect(spyFilterMethod).toHaveBeenCalledTimes(6);

      filter = new FilterInput({
        field: 'age',
        operator: '<',
        value: 30,
      });

      filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toHaveLength(1);
      expect(spyFilterMethod).toHaveBeenCalledTimes(7);

      filter = new FilterInput({
        field: 'age',
        operator: '<=',
        value: 37,
      });

      filteredItems = await repository['applyFilter'](items, [filter]);
      expect(filteredItems).toHaveLength(2);
      expect(spyFilterMethod).toHaveBeenCalledTimes(8);
    });
  });

  describe('applySort method', () => {
    it('Should not sort items.', async () => {
      const items = [
        new StubEntity({ name: 'test1', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'test2', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'test3', age: 37, createdAt: new Date() }),
      ];

      let sortedItems = await repository['applySort'](items, null, null);
      expect(sortedItems).toStrictEqual(items);

      sortedItems = await repository['applySort'](items, 'createdAt', 'asc');
      expect(sortedItems).toStrictEqual(items);
    });

    it('Should sort items.', async () => {
      const items = [
        new StubEntity({ name: 'b', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'a', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'c', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'c', age: 37, createdAt: new Date() }),
      ];

      let sortedItems = await repository['applySort'](items, 'name', 'asc');
      expect(sortedItems).toStrictEqual([
        items[1],
        items[0],
        items[2],
        items[3],
      ]);

      sortedItems = await repository['applySort'](items, 'name', 'desc');
      expect(sortedItems).toStrictEqual([
        items[2],
        items[3],
        items[0],
        items[1],
      ]);
    });
  });

  describe('applyPagination method', () => {
    it('Should apply pagination.', async () => {
      const items = [
        new StubEntity({ name: 'b', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'a', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'c', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'd', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'e', age: 37, createdAt: new Date() }),
      ];

      let paginatedItems = await repository['applyPagination'](items, 1, 2);
      expect(paginatedItems).toStrictEqual([items[0], items[1]]);

      paginatedItems = await repository['applyPagination'](items, 2, 2);
      expect(paginatedItems).toStrictEqual([items[2], items[3]]);

      paginatedItems = await repository['applyPagination'](items, 3, 2);
      expect(paginatedItems).toStrictEqual([items[4]]);

      paginatedItems = await repository['applyPagination'](items, 4, 2);
      expect(paginatedItems).toStrictEqual([]);
    });
  });

  describe('search method', () => {
    it('Should only apply paginate when other params are null.', async () => {
      const entity = new StubEntity({
        name: 'a',
        age: 37,
        createdAt: new Date(),
      });
      const items = Array(21).fill(entity);
      repository.items = items;

      const output = await repository.search(new SearchableInput({}));

      expect(output).toStrictEqual(
        new SearchableOutput({
          items: Array(20).fill(entity),
          totalItems: 21,
          currentPage: 1,
          itemsPerPage: 20,
        }),
      );

      expect(output.totalPages).toBe(2);
    });

    it('Should apply pagination and filter.', async () => {
      const items = [
        new StubEntity({ name: 'test', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'a', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'TEST', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'TeSt', age: 37, createdAt: new Date() }),
      ];
      repository.items = items;

      const output = await repository.search(
        new SearchableInput({
          currentPage: 1,
          itemsPerPage: 2,
          filter: [
            new FilterInput({ field: 'name', operator: '=', value: 'test' }),
          ],
        }),
      );

      expect(output).toStrictEqual(
        new SearchableOutput({
          items: [items[0], items[2]],
          totalItems: 3,
          currentPage: 1,
          itemsPerPage: 2,
        }),
      );
    });

    it('Should apply pagination and sort.', async () => {
      const items = [
        new StubEntity({ name: 'b', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'a', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'd', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'e', age: 37, createdAt: new Date() }),
        new StubEntity({ name: 'c', age: 37, createdAt: new Date() }),
      ];
      repository.items = items;

      const output = await repository.search(
        new SearchableInput({
          currentPage: 1,
          itemsPerPage: 3,
          sortField: 'name',
        }),
      );

      expect(output).toStrictEqual(
        new SearchableOutput({
          items: [items[3], items[2], items[4]],
          totalItems: 5,
          currentPage: 1,
          itemsPerPage: 3,
        }),
      );
    });
  });
});
