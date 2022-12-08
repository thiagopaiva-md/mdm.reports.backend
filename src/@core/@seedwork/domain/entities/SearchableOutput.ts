import Entity from './Entity';
import { SortDirection } from './SearchableInput';

type SearchableOutputProperties<E extends Entity> = {
  items: E[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  sortField?: string;
  sortDirection: SortDirection;
  termToFilter?: string;
};

class SearchableOutput<E extends Entity> {
  private _totalPages: number = 1;

  constructor(public readonly props: SearchableOutputProperties<E>) {
    this.items = this.props.items;
    this.totalItems = this.props.totalItems;
    this.currentPage = this.props.currentPage;
    this.itemsPerPage = this.props.itemsPerPage;
    this._totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.sortField = this.props.sortField;
    this.sortDirection = this.props.sortDirection;
    this.termToFilter = this.props.termToFilter;
  }

  get items(): E[] {
    return this.props.items;
  }

  private set items(value: E[]) {
    this.props.items = value;
  }

  get totalItems(): number {
    return this.props.totalItems;
  }

  private set totalItems(value: number) {
    this.props.totalItems = value;
  }

  get currentPage(): number {
    return this.props.currentPage;
  }

  private set currentPage(value: number) {
    this.props.currentPage = value;
  }

  get itemsPerPage(): number {
    return this.props.itemsPerPage;
  }

  private set itemsPerPage(value: number) {
    this.props.itemsPerPage = value;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get sortField(): string {
    return this.props.sortField;
  }

  private set sortField(value: string) {
    this.props.sortField = value;
  }

  get sortDirection(): SortDirection {
    return this.props.sortDirection;
  }

  private set sortDirection(value: SortDirection) {
    this.props.sortDirection = value;
  }

  get termToFilter(): string {
    return this.props.termToFilter;
  }

  private set termToFilter(value: string) {
    this.props.termToFilter = value;
  }

  toJSON() {
    return {
      items: this.items,
      totalItems: this.totalItems,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      totalPages: this.totalPages,
      sortField: this.sortField,
      sortDirection: this.sortDirection,
      termToFilter: this.termToFilter,
    };
  }
}

export type { SearchableOutputProperties };

export default SearchableOutput;
