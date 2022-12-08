import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';
import { EntityProperties } from '../entities/Entity';
import EntityValidator from './EntityValidator';

class EntityValidationRules {
  @IsOptional()
  @IsString()
  @MaxLength(38)
  id?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  constructor(props: EntityProperties) {
    Object.assign(this, props);
  }
}

class EntityClassValidator extends EntityValidator {
  validate(data: EntityValidationRules): boolean {
    const entityValidationRules = new EntityValidationRules(data);

    return super.validate(entityValidationRules);
  }
}

export { EntityValidationRules };

export default EntityClassValidator;
