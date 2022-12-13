import FilterInput from '../FilterInput';
import SearchableInput from '../SearchableInput';

describe('SearchableInput unit tests.', () => {
  it('Should create a SearchableInput with correct params.', () => {
    const searchableInput = new SearchableInput({
      currentPage: 1,
      itemsPerPage: 10,
      sortField: 'name',
      sortDirection: 'asc',
      filter: [{ field: 'name', operator: '=', value: 'thiago' }],
    });

    expect(searchableInput.props).toStrictEqual({
      currentPage: 1,
      itemsPerPage: 10,
      sortField: 'name',
      sortDirection: 'asc',
      filter: [{ field: 'name', operator: '=', value: 'thiago' }],
    });

    expect(searchableInput.currentPage).toBe(1);
    expect(searchableInput.itemsPerPage).toBe(10);
    expect(searchableInput.sortField).toBe('name');
    expect(searchableInput.sortDirection).toBe('asc');
    expect(searchableInput.filter[0].field).toBe('name');
    expect(searchableInput.filter[0].operator).toBe('=');
    expect(searchableInput.filter[0].value).toBe('thiago');
  });

  it('Should normalize a SearchableInput with currentPage and itemsPerPage param.', () => {
    const searchableInput = new SearchableInput({
      currentPage: 'thiago' as any,
      itemsPerPage: 'thiago' as any,
    });

    expect(searchableInput.props).toStrictEqual({
      currentPage: 1,
      itemsPerPage: 20,
      sortDirection: 'desc',
      sortField: null,
    });

    expect(searchableInput.currentPage).toBe(1);
    expect(searchableInput.itemsPerPage).toBe(20);
    expect(searchableInput.sortDirection).toBe('desc');
    expect(searchableInput.sortField).toBeNull();
  });
});
