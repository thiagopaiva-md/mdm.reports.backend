import Entity, {
  EntityProperties,
} from '@core/@seedwork/domain/entities/Entity';
import SearchableInput from '@core/@seedwork/domain/entities/SearchableInput';
import SearchableOutput from '@core/@seedwork/domain/entities/SearchableOutput';
import EntitySearchableRepositoryInMemory from '../EntitySearchableRepositoryInMemory';

interface StubProperties extends EntityProperties {
  name: string;
}

class StubEntity extends Entity<StubProperties> {
  name: string;

  constructor(public readonly props: StubProperties) {
    super(props);
    this.name = this.props.name;
  }
}

class StubEntitySearchableRepositoryInMemory extends EntitySearchableRepositoryInMemory<StubEntity> {
  sortableFields = ['name'];

  protected async doFilter(
    items: StubEntity[],
    termToFilter?: string,
  ): Promise<StubEntity[]> {
    return items.filter(item => {
      return item.name.toLowerCase().includes(termToFilter.toLowerCase());
    });
  }
}

describe('EntitySearchableRepositoryInMemory unit tests.', () => {
  let repository: StubEntitySearchableRepositoryInMemory;

  beforeEach(() => {
    repository = new StubEntitySearchableRepositoryInMemory();
  });
  describe('applyFilter method tests.', () => {
    it('Should not filter items when filter param is null.', async () => {
      const items = [new StubEntity({ name: 'name', createdAt: new Date() })];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      const filteredItems = await repository['applyFilter'](items, null);

      expect(filteredItems).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('Should filter using a filter param.', async () => {
      const items = [
        new StubEntity({ name: 'test1', createdAt: new Date() }),
        new StubEntity({ name: 'test2', createdAt: new Date() }),
        new StubEntity({ name: 'test3', createdAt: new Date() }),
      ];

      const spyFilterMethod = jest.spyOn(items, 'filter');

      let filteredItems = await repository['applyFilter'](items, 'test2');
      expect(filteredItems).toStrictEqual([items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      filteredItems = await repository['applyFilter'](items, 'test3');
      expect(filteredItems).toStrictEqual([items[2]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      filteredItems = await repository['applyFilter'](items, 'no-filter');
      expect(filteredItems).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe('applySort method', () => {
    it('Should not sort items.', async () => {
      const items = [
        new StubEntity({ name: 'test1', createdAt: new Date() }),
        new StubEntity({ name: 'test2', createdAt: new Date() }),
        new StubEntity({ name: 'test3', createdAt: new Date() }),
      ];

      let sortedItems = await repository['applySort'](items, null, null);
      expect(sortedItems).toStrictEqual(items);

      sortedItems = await repository['applySort'](items, 'createdAt', 'asc');
      expect(sortedItems).toStrictEqual(items);
    });

    it('Should sort items.', async () => {
      const items = [
        new StubEntity({ name: 'b', createdAt: new Date() }),
        new StubEntity({ name: 'a', createdAt: new Date() }),
        new StubEntity({ name: 'c', createdAt: new Date() }),
        new StubEntity({ name: 'c', createdAt: new Date() }),
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
        new StubEntity({ name: 'b', createdAt: new Date() }),
        new StubEntity({ name: 'a', createdAt: new Date() }),
        new StubEntity({ name: 'c', createdAt: new Date() }),
        new StubEntity({ name: 'd', createdAt: new Date() }),
        new StubEntity({ name: 'e', createdAt: new Date() }),
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
      const entity = new StubEntity({ name: 'a', createdAt: new Date() });
      const items = Array(21).fill(entity);
      repository.items = items;

      const output = await repository.search(new SearchableInput({}));

      expect(output).toStrictEqual(
        new SearchableOutput({
          items: Array(20).fill(entity),
          totalItems: 21,
          currentPage: 1,
          itemsPerPage: 20,
          sortField: null,
          sortDirection: 'desc',
          termToFilter: null,
        }),
      );

      expect(output.totalPages).toBe(2);
    });

    it('Should apply pagination and filter.', async () => {
      const items = [
        new StubEntity({ name: 'test', createdAt: new Date() }),
        new StubEntity({ name: 'a', createdAt: new Date() }),
        new StubEntity({ name: 'TEST', createdAt: new Date() }),
        new StubEntity({ name: 'TeSt', createdAt: new Date() }),
      ];
      repository.items = items;

      const output = await repository.search(
        new SearchableInput({
          currentPage: 1,
          itemsPerPage: 2,
          termToFilter: 'TEST',
        }),
      );

      expect(output).toStrictEqual(
        new SearchableOutput({
          items: [items[0], items[2]],
          totalItems: 3,
          currentPage: 1,
          itemsPerPage: 2,
          sortField: null,
          sortDirection: 'desc',
          termToFilter: 'TEST',
        }),
      );
    });

    it('Should apply pagination and sort.', async () => {
      const items = [
        new StubEntity({ name: 'b', createdAt: new Date() }),
        new StubEntity({ name: 'a', createdAt: new Date() }),
        new StubEntity({ name: 'd', createdAt: new Date() }),
        new StubEntity({ name: 'e', createdAt: new Date() }),
        new StubEntity({ name: 'c', createdAt: new Date() }),
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
          sortField: 'name',
          sortDirection: 'desc',
          termToFilter: null,
        }),
      );
    });
  });
});
