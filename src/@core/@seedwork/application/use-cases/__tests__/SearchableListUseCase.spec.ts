import Entity, {
  EntityProperties,
} from '@core/@seedwork/domain/entities/Entity';
import FilterInput from '@core/@seedwork/domain/entities/FilterInput';
import SearchableRepositoryInMemory from '@core/@seedwork/domain/repositories/InMemory/EntitySearchableRepositoryInMemory';
import SearchableListUseCase from '../SearchableListUseCase';

interface ItemDTO extends EntityProperties {
  name: string;
}

class StubEntity extends Entity {
  name: string;

  constructor(public readonly props: ItemDTO) {
    super(props);

    this.name = this.props.name;
  }
}

class StubSearchableRepositoryInMemory extends SearchableRepositoryInMemory<StubEntity> {
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
        }

        return this.testItemFilter(value, f);
      });
    });

    return tempItems;
  }
}

class StubSearchableListUseCase extends SearchableListUseCase<
  StubEntity,
  ItemDTO
> {
  protected mapItems(items: StubEntity[]): ItemDTO[] {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }
}

describe('SearchableListUseCase unit tests.', () => {
  let repository: StubSearchableRepositoryInMemory;
  let useCase: StubSearchableListUseCase;

  beforeEach(() => {
    repository = new StubSearchableRepositoryInMemory();
    useCase = new StubSearchableListUseCase(repository);
  });

  it('Should return a list.', async () => {
    repository.items = [
      new StubEntity({ name: 'thiago' }),
      new StubEntity({ name: 'joão' }),
      new StubEntity({ name: 'josé' }),
    ];
    const spySearch = jest.spyOn(repository, 'search');

    const data = await useCase.execute({});

    expect(spySearch).toHaveBeenCalledTimes(1);
    expect(data).toStrictEqual({
      items: [
        {
          id: repository.items[0].id,
          name: 'thiago',
          createdAt: repository.items[0].createdAt,
          updatedAt: repository.items[0].updatedAt,
        },
        {
          id: repository.items[1].id,
          name: 'joão',
          createdAt: repository.items[1].createdAt,
          updatedAt: repository.items[1].updatedAt,
        },
        {
          id: repository.items[2].id,
          name: 'josé',
          createdAt: repository.items[2].createdAt,
          updatedAt: repository.items[2].updatedAt,
        },
      ],
      totalItems: 3,
      currentPage: 1,
      itemsPerPage: 20,
      totalPages: 1,
    });
  });
});
