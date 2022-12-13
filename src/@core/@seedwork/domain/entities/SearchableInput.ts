import FilterInput, { FilterInputProperties } from './FilterInput';

type SortDirection = 'asc' | 'desc';

type SearchableInputProperties = {
  currentPage?: number;
  itemsPerPage?: number;
  sortField?: string;
  sortDirection?: SortDirection;
  filter?: FilterInputProperties[];
};

class SearchableInput {
  private _filter: FilterInput[];

  constructor(public readonly props: SearchableInputProperties) {
    this.currentPage = this.props.currentPage;
    this.itemsPerPage = this.props.itemsPerPage;
    this.sortField = this.props.sortField;
    this.sortDirection = this.props.sortDirection;
    this.filter = this.props.filter;
  }

  get currentPage(): number {
    return this.props.currentPage;
  }

  private set currentPage(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this.props.currentPage = _page;
  }

  get itemsPerPage(): number {
    return this.props.itemsPerPage;
  }

  private set itemsPerPage(value: number) {
    let perPage = +value;

    if (
      Number.isNaN(perPage) ||
      perPage <= 0 ||
      parseInt(perPage as any) !== perPage
    ) {
      perPage = 20;
    }

    this.props.itemsPerPage = perPage;
  }

  get sortField(): string {
    return this.props.sortField;
  }

  private set sortField(value: string) {
    this.props.sortField =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sortDirection(): SortDirection {
    return this.props.sortDirection;
  }

  private set sortDirection(value: SortDirection) {
    const sortDir = `${value}`.toLowerCase();

    this.props.sortDirection =
      sortDir !== 'asc' && sortDir !== 'desc' ? 'desc' : sortDir;
  }

  get filter(): FilterInput[] {
    return this._filter;
  }

  private set filter(value: FilterInputProperties[]) {
    if (value) {
      this._filter = [];

      value.forEach(v => {
        const oneFilter = new FilterInput(v);
        this._filter.push(oneFilter);
      });
    } else {
      this._filter = null;
    }
  }
}

export type { SearchableInputProperties, SortDirection };

export default SearchableInput;
