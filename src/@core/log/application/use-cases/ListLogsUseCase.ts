import LogRepositoryInterface from '@core/log/domain/repositories/contracts/LogRepositoryInterface';
import LogOutputDTO from '../dto/LogOutput.dto';
import SearchableListUseCase from '@core/@seedwork/application/use-cases/SearchableListUseCase';
import Log from '@core/log/domain/entities/Log';
import LogOutputMapper from '../mappers/LogOutputMapper';

class ListLogsUseCase extends SearchableListUseCase<Log, LogOutputDTO> {
  constructor(private logRepository: LogRepositoryInterface) {
    super(logRepository);
  }

  protected mapItems(items: Log[]): LogOutputDTO[] {
    return items.map(item => LogOutputMapper.toOutput(item));
  }
}

export default ListLogsUseCase;
