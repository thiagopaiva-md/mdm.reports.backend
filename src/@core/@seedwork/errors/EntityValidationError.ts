import { EntityFieldError } from '../domain/validators/EntityValidator';

class EntityValidationError extends Error {
  constructor(public error: EntityFieldError) {
    super('Entity validation error');

    this.name = 'EntityValidationError';
  }
}

export default EntityValidationError;
