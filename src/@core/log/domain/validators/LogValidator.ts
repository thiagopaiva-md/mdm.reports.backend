import EntityValidator from '@core/@seedwork/domain/validators/EntityValidator';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

type LogValidationRulesProperties = {
  equipmentId: string;
  log: string;
};

class LogValidationRules {
  @IsNotEmpty()
  @IsString()
  @MaxLength(38)
  equipmentId: string;

  @IsNotEmpty()
  @IsString()
  log: string;

  constructor(props: LogValidationRulesProperties) {
    Object.assign(this, props);
  }
}

class LogValidator extends EntityValidator {
  validate(data: LogValidationRules): boolean {
    const logValidationRules = new LogValidationRules(data);

    return super.validate(logValidationRules);
  }
}

export default LogValidator;
