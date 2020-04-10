import { getCountries } from './countryServices';
import { Country } from '../types/Country';
import { State } from '../types/State';
import { SearchResult } from '../types/SearchResult';

export const search = (keyword: string): SearchResult => {
  const countriesResults: any[] = [];
  const statesResults: any[] = [];

  const countries = getCountries();

  countries.forEach((country: Country) => {
    if (country.name.indexOf(keyword) !== -1) {
      countriesResults.push(country);
    }

    if (country.states) {
      country.states.forEach((state: State) => {
        if (state.name.indexOf(keyword) !== -1) {
          statesResults.push(country);
        }
      });
    }
  });

  return {
    countriesResults,
    statesResults,
  };
};
