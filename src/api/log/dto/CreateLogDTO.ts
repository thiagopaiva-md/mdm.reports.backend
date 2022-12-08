import { LogInput } from '@core/log/application/use-cases/CreateLogUseCase';

class CreateLogDTO implements LogInput {
  equipmentId: string;
  log: string;
}

export default CreateLogDTO;
