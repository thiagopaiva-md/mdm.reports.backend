import { SortDirection } from '../../domain/entities/SearchableInput';

type SearchOutput<E> = {
  items: E[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  sortField?: string;
  sortDirection?: SortDirection;
  termToFilter?: string;
};

export default SearchOutput;
