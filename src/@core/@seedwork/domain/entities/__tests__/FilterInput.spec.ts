import FilterInput from '../FilterInput';

describe('FilterInput unit tests.', () => {
  it('Should create a filter input instance with correct params.', () => {
    const filterInput = new FilterInput({
      field: 'name',
      operator: '=',
      value: 'thiago',
    });

    expect(filterInput.props).toStrictEqual({
      field: 'name',
      operator: '=',
      value: 'thiago',
    });

    expect(filterInput.field).toBe('name');
    expect(filterInput.operator).toBe('=');
    expect(filterInput.value).toBe('thiago');
  });

  it('Should normalize inputs.', () => {
    const filterInput1 = new FilterInput({
      field: 8 as any,
      operator: '!=',
      value: 'thiago',
    });

    const filterInput2 = new FilterInput({
      field: 22 as any,
      operator: 8 as any,
      value: 50,
    });

    const filterInput3 = new FilterInput({
      field: 22 as any,
      operator: 8 as any,
      value: true as any,
    });

    expect(filterInput1.field).toBe('8');
    expect(filterInput1.operator).toBe('!=');
    expect(filterInput1.value).toBe('thiago');

    expect(filterInput2.field).toBe('22');
    expect(filterInput2.operator).toBe('=');
    expect(filterInput2.value).toBe(50);

    expect(filterInput3.field).toBe('22');
    expect(filterInput3.operator).toBe('=');
    expect(filterInput3.value).toBe('true');
  });

  it('Should throw error with invalid input combination.', () => {
    expect(
      () => new FilterInput({ field: 'name', operator: '>', value: 'thiago' }),
    ).toThrow();

    expect(
      () => new FilterInput({ field: 'name', operator: 'in', value: 8 }),
    ).toThrow();
  });
});
