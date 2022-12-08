import Entity, {
  EntityProperties,
} from '@core/@seedwork/domain/entities/Entity';
import EntityValidationError from '@core/@seedwork/errors/EntityValidationError';
import LogValidator from '../validators/LogValidator';

interface LogProperties extends EntityProperties {
  equipmentId: string;
  log: string;
}

class Log extends Entity<LogProperties> {
  constructor(public readonly props: LogProperties) {
    Log.validate(props);

    super(props);

    this.equipmentId = this.props.equipmentId;
    this.log = this.props.log;
  }

  static validate(props: LogProperties): void {
    const validator = new LogValidator();

    if (!validator.validate(props)) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(props: LogProperties): void {
    Log.validate(props);

    super.update(props);

    this.equipmentId = props.equipmentId;
    this.log = props.log;
  }

  get equipmentId(): string {
    return this.props.equipmentId;
  }

  private set equipmentId(value: string) {
    this.props.equipmentId = value;
  }

  get log(): string {
    return this.props.log;
  }

  private set log(value: string) {
    this.props.log = value;
  }
}

export type { LogProperties };

export default Log;
