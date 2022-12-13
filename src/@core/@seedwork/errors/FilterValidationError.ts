class FilterValidationError extends Error {
  constructor(msg: string) {
    super('Filter validation error');

    this.name = 'FilterValidationError';
  }
}

export default FilterValidationError;
