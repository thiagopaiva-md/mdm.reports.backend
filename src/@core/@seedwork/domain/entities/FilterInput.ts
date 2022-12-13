import FilterValidationError from '@core/@seedwork/errors/FilterValidationError';

const operator = ['=', '!=', '>', '>=', '<', '<=', 'in'] as const;
type Operator = typeof operator[number];

type FilterInputProperties = {
  field: string;
  operator: Operator;
  value: string | number | Date;
};

class FilterInput {
  constructor(public readonly props: FilterInputProperties) {
    FilterInput.validate(props);

    this.field = this.props.field;
    this.operator = this.props.operator;
    this.value = this.props.value;
  }

  static validate(props: FilterInputProperties): void {
    const { operator, value } = props;

    if (
      (typeof value === 'string' &&
        operator !== '=' &&
        operator !== '!=' &&
        operator !== 'in') ||
      ((typeof value === 'number' || typeof value === 'object') &&
        operator === 'in')
    ) {
      throw new FilterValidationError(
        `Value ${value} does not accept the operator ${operator}.`,
      );
    }
  }

  private isOperator(value: any): boolean {
    return operator.includes(value);
  }

  get field(): string {
    return this.props.field;
  }

  private set field(value: string) {
    this.props.field = typeof value === 'string' ? value : `${value}`;
  }

  get operator(): Operator {
    return this.props.operator;
  }

  private set operator(value: Operator) {
    this.props.operator = this.isOperator(value) ? value : '=';
  }

  get value(): string | number | Date {
    return this.props.value;
  }

  private set value(value: string | number | Date) {
    if (typeof value === 'string') {
      this.props.value = value.toLowerCase();
    } else {
      this.props.value =
        typeof value !== 'number' && typeof value !== 'object' // Date = object
          ? `${value}`
          : value;
    }
  }
}

export type { FilterInputProperties };

export default FilterInput;
