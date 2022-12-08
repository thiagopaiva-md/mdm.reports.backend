import { container } from 'tsyringe';

import CreateLogUseCase from '@core/log/application/use-cases/CreateLogUseCase';
import LogRepositoryInterface from '@core/log/domain/repositories/contracts/LogRepositoryInterface';
import GetLogUseCase from '@core/log/application/use-cases/GetLogUseCase';
import ListLogsUseCase from '@core/log/application/use-cases/ListLogsUseCase';

class LogUseCasesContainerRegister {
  static register(): void {
    container.register(CreateLogUseCase, {
      useFactory: () => {
        return new CreateLogUseCase(
          container.resolve<LogRepositoryInterface>('LogRepository'),
        );
      },
    });

    container.register(GetLogUseCase, {
      useFactory: () => {
        return new GetLogUseCase(
          container.resolve<LogRepositoryInterface>('LogRepository'),
        );
      },
    });

    container.register(ListLogsUseCase, {
      useFactory: () => {
        return new ListLogsUseCase(
          container.resolve<LogRepositoryInterface>('LogRepository'),
        );
      },
    });
  }
}

export default LogUseCasesContainerRegister;
