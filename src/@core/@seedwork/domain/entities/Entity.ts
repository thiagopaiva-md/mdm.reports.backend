import { randomUUID } from 'node:crypto';

import EntityValidationError from '@core/@seedwork/errors/EntityValidationError';

import EntityClassValidator from '../validators/EntityClassValidator';

interface EntityProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

abstract class Entity<Properties = EntityProperties> {
  constructor(public readonly props: EntityProperties = {} as any) {
    Entity.validate(props);

    this.id = this.props.id;
    this.createdAt = this.props.createdAt;
    this.updatedAt = this.props.updatedAt;
  }

  static validate(props: EntityProperties): void {
    const validator = new EntityClassValidator();

    if (!validator.validate(props)) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(props: EntityProperties): void {
    Entity.validate(props);

    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.props.id;
  }

  private set id(value: string) {
    this.props.id = value ?? `{${randomUUID().toUpperCase()}}`;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private set createdAt(value: Date) {
    this.props.createdAt = value ?? new Date();
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private set updatedAt(value: Date) {
    this.props.updatedAt = value ?? new Date();
  }
}

export type { EntityProperties };

export default Entity;
