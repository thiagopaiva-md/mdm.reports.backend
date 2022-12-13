import Entity from '../../domain/entities/Entity';
import SearchableInput from '../../domain/entities/SearchableInput';
import SearchableRepositoryInterface from '../../domain/repositories/contracts/SearchableRepositoryInterface';
import UseCaseInterface from '../contracts/UseCaseInterface';
import SearchInput from '../dto/SearchInput.dto';
import SearchOutput from '../dto/SearchOutput.dto';

abstract class SearchableListUseCase<E extends Entity, ItemDTO>
  implements UseCaseInterface<SearchInput, SearchOutput<ItemDTO>>
{
  constructor(private searchableRepository: SearchableRepositoryInterface<E>) {}

  async execute(input: SearchInput): Promise<SearchOutput<ItemDTO>> {
    const params = new SearchableInput(input);

    const searchResult = await this.searchableRepository.search(params);

    return {
      items: this.mapItems(searchResult.items),
      totalItems: searchResult.totalItems,
      currentPage: searchResult.currentPage,
      itemsPerPage: searchResult.itemsPerPage,
      totalPages: searchResult.totalPages,
    };
  }

  protected abstract mapItems(items: E[]): ItemDTO[];
}

export default SearchableListUseCase;
