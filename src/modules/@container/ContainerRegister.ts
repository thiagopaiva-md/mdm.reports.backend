import LogRepositoryContainerRegister from '@modules/log/repositories/LogRepositoryContainerRegister';
import LogUseCasesContainerRegister from '@modules/log/use-cases/LogUseCasesContainerRegister';

class ContainerRegister {
  static registerAll(): void {
    LogRepositoryContainerRegister.register();
    LogUseCasesContainerRegister.register();
  }
}

export default ContainerRegister;
