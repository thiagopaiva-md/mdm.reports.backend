import LogRepositoryInterface from '@core/log/domain/repositories/contracts/LogRepositoryInterface';
import UseCaseInterface from '@core/@seedwork/application/contracts/UseCaseInterface';
import LogOutput from '../dto/LogOutput.dto';
import LogOutputMapper from '../mappers/LogOutputMapper';

type LogInput = {
  id: string;
};

class GetLogUseCase implements UseCaseInterface<LogInput, LogOutput> {
  constructor(private logRepository: LogRepositoryInterface) {}

  async execute(input: LogInput): Promise<LogOutput | null> {
    const log = await this.logRepository.findById(input.id);

    if (!log) {
      return null;
    }

    return LogOutputMapper.toOutput(log);
  }
}

export default GetLogUseCase;
