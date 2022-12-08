import SearchableInput from '../SearchableInput';

describe('SearchableInput unit tests.', () => {
  it('Should create a SearchableInput with correct params.', () => {
    const searchableInput = new SearchableInput({
      currentPage: 1,
      itemsPerPage: 10,
      sortField: 'name',
      sortDirection: 'asc',
      termToFilter: 'thiago',
    });

    expect(searchableInput.props).toStrictEqual({
      currentPage: 1,
      itemsPerPage: 10,
      sortField: 'name',
      sortDirection: 'asc',
      termToFilter: 'thiago',
    });

    expect(searchableInput.currentPage).toBe(1);
    expect(searchableInput.itemsPerPage).toBe(10);
    expect(searchableInput.sortField).toBe('name');
    expect(searchableInput.sortDirection).toBe('asc');
    expect(searchableInput.termToFilter).toBe('thiago');
  });

  it('Should normalize a SearchableInput with currentPage and itemsPerPage param.', () => {
    const searchableInput = new SearchableInput({
      currentPage: 'thiago' as any,
      itemsPerPage: 'thiago' as any,
    });

    expect(searchableInput.props).toStrictEqual({
      currentPage: 1,
      itemsPerPage: 20,
      sortField: null,
      sortDirection: 'desc',
      termToFilter: null,
    });

    expect(searchableInput.currentPage).toBe(1);
    expect(searchableInput.itemsPerPage).toBe(20);
    expect(searchableInput.sortField).toBeNull();
    expect(searchableInput.sortDirection).toBe('desc');
    expect(searchableInput.termToFilter).toBeNull();
  });
});
