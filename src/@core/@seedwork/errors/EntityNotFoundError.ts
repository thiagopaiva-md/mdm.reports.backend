class EntityNotFoundError extends Error {
  constructor(msg: string) {
    super('Entity not found error');

    this.name = 'EntityNotFoundError';
  }
}

export default EntityNotFoundError;
