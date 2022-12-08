import { SortDirection } from '../../domain/entities/SearchableInput';

type SearchInput = {
  currentPage?: number;
  itemsPerPage?: number;
  sortColumnName?: string;
  sortDirection?: SortDirection;
  termToFilter?: string;
};

export default SearchInput;
