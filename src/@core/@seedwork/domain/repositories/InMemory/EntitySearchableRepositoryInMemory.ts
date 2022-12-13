import { equal } from 'assert';
import Entity from '../../entities/Entity';
import FilterInput from '../../entities/FilterInput';
import SearchableInput, { SortDirection } from '../../entities/SearchableInput';
import SearchableOutput from '../../entities/SearchableOutput';
import SearchableRepositoryInterface from '../contracts/SearchableRepositoryInterface';
import EntityRepositoryInMemory from './EntityRepositoryInMemory';

abstract class EntitySearchableRepositoryInMemory<E extends Entity>
  extends EntityRepositoryInMemory<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];

  async search(searchProps: SearchableInput): Promise<SearchableOutput<E>> {
    const filteredItems = await this.applyFilter(
      this.items,
      searchProps.filter,
    );

    const sortedItems = await this.applySort(
      filteredItems,
      searchProps.sortField,
      searchProps.sortDirection,
    );

    const paginatedItems = await this.applyPagination(
      sortedItems,
      searchProps.currentPage,
      searchProps.itemsPerPage,
    );

    return new SearchableOutput({
      items: paginatedItems,
      totalItems: filteredItems.length,
      currentPage: searchProps.currentPage,
      itemsPerPage: searchProps.itemsPerPage,
    });
  }

  protected async applyFilter(items: E[], filter: FilterInput[]): Promise<E[]> {
    if (!filter) {
      return items;
    }

    return this.filterItems(items, filter);
  }

  protected abstract filterItems(
    items: E[],
    filter: FilterInput[],
  ): Promise<E[]>;

  protected testItemFilter(
    value: string | number | Date,
    filter: FilterInput,
  ): boolean {
    switch (filter.operator) {
      case '=':
      default:
        return value === filter.value;
      case '!=':
        return value !== filter.value;
      case '>':
        return value > filter.value;
      case '>=':
        return value >= filter.value;
      case '<':
        return value < filter.value;
      case '<=':
        return value <= filter.value;
      case 'in':
        return (value as string).includes(filter.value as string);
    }
  }

  protected async applySort(
    items: E[],
    sortFieldName?: string,
    sortDirection?: SortDirection,
  ): Promise<E[]> {
    if (!sortFieldName || !this.sortableFields.includes(sortFieldName)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sortFieldName] < b.props[sortFieldName]) {
        return sortDirection === 'asc' ? -1 : 1;
      }

      if (a.props[sortFieldName] > b.props[sortFieldName]) {
        return sortDirection === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPagination(
    items: E[],
    page: number,
    perPage: number,
  ): Promise<E[]> {
    const start = (page - 1) * perPage;
    const limit = start + perPage;

    return items.slice(start, limit);
  }
}

export default EntitySearchableRepositoryInMemory;
