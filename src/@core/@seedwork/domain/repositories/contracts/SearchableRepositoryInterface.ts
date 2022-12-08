import Entity from '../../entities/Entity';
import SearchableInput from '../../entities/SearchableInput';
import SearchableOutput from '../../entities/SearchableOutput';
import RepositoryInterface from './RepositoryInterface';

interface SearchableRepositoryInterface<E extends Entity>
  extends RepositoryInterface<E> {
  sortableFields: string[];

  search(searchProps: SearchableInput): Promise<SearchableOutput<E>>;
}

export default SearchableRepositoryInterface;
