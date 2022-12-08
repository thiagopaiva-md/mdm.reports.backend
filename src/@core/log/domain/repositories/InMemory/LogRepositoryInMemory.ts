import EntitySearchableRepositoryInMemory from '@core/@seedwork/domain/repositories/InMemory/EntitySearchableRepositoryInMemory';
import Log from '../../entities/Log';
import LogRepositoryInterface from '../contracts/LogRepositoryInterface';

class LogRepositoryInMemory
  extends EntitySearchableRepositoryInMemory<Log>
  implements LogRepositoryInterface
{
  sortableFields = ['log'];

  protected async doFilter(
    items: Log[],
    termToFilter?: string,
  ): Promise<Log[]> {
    return items.filter(item => {
      return item.log.toLowerCase().includes(termToFilter.toLowerCase());
    });
  }
}

export default LogRepositoryInMemory;
