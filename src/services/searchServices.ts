import { getCountries } from './countryServices';
import { SearchResult } from '../types/SearchResult';

export const search = (keyword: string): SearchResult => {
  const countries = getCountries();
  const invariantKeyword = keyword.toLocaleLowerCase();
  const countriesResults = countries.filter(
    (country) => country.name.toLocaleLowerCase().indexOf(invariantKeyword) !== -1,
  );

  const allStates = countries.map((countries) => countries.states || []).flat();
  const statesResults = allStates.filter((state) => state.name.toLocaleLowerCase().indexOf(invariantKeyword) !== -1);

  return {
    countriesResults,
    statesResults,
  };
};
