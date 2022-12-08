import { container } from 'tsyringe';

import LogRepositoryInterface from '@core/log/domain/repositories/contracts/LogRepositoryInterface';
import LogRepositoryInMemory from '@core/log/domain/repositories/InMemory/LogRepositoryInMemory';

class LogRepositoryContainerRegister {
  static register(): void {
    switch (process.env.DB_VENDOR) {
      case 'inMemory': {
        container.registerSingleton<LogRepositoryInterface>(
          'LogRepository',
          LogRepositoryInMemory,
        );
      }
    }
  }
}

export default LogRepositoryContainerRegister;
