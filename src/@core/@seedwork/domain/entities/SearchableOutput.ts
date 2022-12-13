import Entity from './Entity';

type SearchableOutputProperties<E extends Entity> = {
  items: E[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

class SearchableOutput<E extends Entity> {
  private _totalPages: number = 1;

  constructor(public readonly props: SearchableOutputProperties<E>) {
    this.items = this.props.items;
    this.totalItems = this.props.totalItems;
    this.currentPage = this.props.currentPage;
    this.itemsPerPage = this.props.itemsPerPage;
    this._totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
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

  toJSON() {
    return {
      items: this.items,
      totalItems: this.totalItems,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      totalPages: this.totalPages,
    };
  }
}

export type { SearchableOutputProperties };

export default SearchableOutput;
