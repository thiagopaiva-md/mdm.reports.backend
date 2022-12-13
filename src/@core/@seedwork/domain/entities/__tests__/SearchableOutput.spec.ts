import SearchableOutput from '../SearchableOutput';

describe('SearchableOutput unit tests.', () => {
  it('Should create a SearchableOutput with correct params.', () => {
    const searchableOutput = new SearchableOutput({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
    });

    expect(searchableOutput.props).toStrictEqual({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
    });

    expect(searchableOutput.items).toStrictEqual([]);
    expect(searchableOutput.totalItems).toBe(4);
    expect(searchableOutput.currentPage).toBe(1);
    expect(searchableOutput.itemsPerPage).toBe(20);
    expect(searchableOutput.totalPages).toBe(1);
  });

  test('toJSON method.', () => {
    const searchableOutput = new SearchableOutput({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
    });

    const json = searchableOutput.toJSON();

    expect(json).toStrictEqual({
      items: [],
      totalItems: 4,
      currentPage: 1,
      itemsPerPage: 20,
      totalPages: 1,
    });

    expect(json.items).toStrictEqual([]);
    expect(json.totalItems).toBe(4);
    expect(json.currentPage).toBe(1);
    expect(json.itemsPerPage).toBe(20);
    expect(json.totalPages).toBe(1);
  });
});
