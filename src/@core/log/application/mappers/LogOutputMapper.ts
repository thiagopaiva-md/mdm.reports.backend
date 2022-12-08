import Log from '@core/log/domain/entities/Log';
import LogOutput from '../dto/LogOutput.dto';

class LogOutputMapper {
  static toOutput(log: Log): LogOutput {
    return {
      id: log.id,
      equipmentId: log.equipmentId,
      log: log.log,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    };
  }
}

export default LogOutputMapper;
