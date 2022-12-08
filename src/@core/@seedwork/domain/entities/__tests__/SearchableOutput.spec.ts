import SearchableOutput from '../SearchableOutput';

describe('SearchableOutput unit tests.', () => {
  it('Should create a SearchableOutput with correct params.', () => {
    const searchableOutput = new SearchableOutput({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
      sortDirection: 'asc',
      sortField: 'name',
      termToFilter: 'thiago',
    });

    expect(searchableOutput.props).toStrictEqual({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
      sortDirection: 'asc',
      sortField: 'name',
      termToFilter: 'thiago',
    });

    expect(searchableOutput.items).toStrictEqual([]);
    expect(searchableOutput.totalItems).toBe(4);
    expect(searchableOutput.currentPage).toBe(1);
    expect(searchableOutput.itemsPerPage).toBe(20);
    expect(searchableOutput.totalPages).toBe(1);
    expect(searchableOutput.sortDirection).toBe('asc');
    expect(searchableOutput.sortField).toBe('name');
    expect(searchableOutput.termToFilter).toBe('thiago');
  });

  test('toJSON method.', () => {
    const searchableOutput = new SearchableOutput({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
      sortDirection: 'asc',
      sortField: 'name',
      termToFilter: 'thiago',
    });

    const json = searchableOutput.toJSON();

    expect(json).toStrictEqual({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
      totalPages: 1,
      sortDirection: 'asc',
      sortField: 'name',
      termToFilter: 'thiago',
    });

    expect(json.items).toStrictEqual([]);
    expect(json.totalItems).toBe(4);
    expect(json.currentPage).toBe(1);
    expect(json.itemsPerPage).toBe(20);
    expect(json.totalPages).toBe(1);
    expect(json.sortDirection).toBe('asc');
    expect(json.sortField).toBe('name');
    expect(json.termToFilter).toBe('thiago');
  });
});
