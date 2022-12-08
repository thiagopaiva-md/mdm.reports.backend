import { validateSync } from 'class-validator';

type EntityFieldError = {
  [field: string]: string[];
};

abstract class EntityValidator {
  errors: EntityFieldError = null;

  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};

      errors.forEach(error => {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      });
    }

    return !errors.length;
  }
}

export type { EntityFieldError };

export default EntityValidator;
