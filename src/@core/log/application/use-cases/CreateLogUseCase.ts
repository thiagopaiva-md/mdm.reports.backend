import Log from '@core/log/domain/entities/Log';
import LogRepositoryInterface from '@core/log/domain/repositories/contracts/LogRepositoryInterface';
import UseCaseInterface from '@core/@seedwork/application/contracts/UseCaseInterface';
import LogOutput from '../dto/LogOutput.dto';
import LogOutputMapper from '../mappers/LogOutputMapper';

type LogInput = {
  equipmentId: string;
  log: string;
};

class CreateLogUseCase implements UseCaseInterface<LogInput, LogOutput> {
  constructor(private logRepository: LogRepositoryInterface) {}

  async execute(input: LogInput): Promise<LogOutput> {
    const log = new Log(input);

    await this.logRepository.insert(log);

    return LogOutputMapper.toOutput(log);
  }
}

export type { LogInput };

export default CreateLogUseCase;
