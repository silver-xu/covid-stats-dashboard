import { Country } from './Country';
import { State } from './State';

export interface SearchResult {
  countriesResults: Country[];
  statesResults: State[];
}
