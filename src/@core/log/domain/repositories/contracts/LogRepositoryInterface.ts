import SearchableRepositoryInterface from '@core/@seedwork/domain/repositories/contracts/SearchableRepositoryInterface';
import Log from '../../entities/Log';

interface LogRepositoryInterface extends SearchableRepositoryInterface<Log> {}

export default LogRepositoryInterface;
