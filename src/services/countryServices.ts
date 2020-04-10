import { default as countries } from '../config/countries.json';
import { Country } from '../types/Country';
import { State } from '../types/State';

export const getCountryByCode = (countryCode: string): Country => {
  const iterableCountries = countries as any;
  const country = iterableCountries[countryCode];

  return (
    {
      code: countryCode,
      name: country.name,
      geoName: country.geoName,
      states: getStatesByCountryCode(countryCode),
    } as Country
  );
};

export const getStateByCode = (countryCode: string, stateCode: string): State => {
  const iterableCountries = countries as any;
  const country = iterableCountries[countryCode];
  const state = country.states[stateCode];

  return (
    {
      code: stateCode,
      name: state.name,
      geoName: state.geoName,
    } as State
  );
};

export const getCountries = (): Country[] =>
  Object.entries(countries).map(
    ([countryCode, country]) =>
      ({
        code: countryCode,
        states: getStatesByCountryCode(countryCode),
        ...country,
      } as Country),
  );

export const getStatesByCountryCode = (countryCode: string): State[] | undefined => {
  const iterableCountries = countries as any;

  return (
    iterableCountries[countryCode] &&
    iterableCountries[countryCode].states &&
    Object.entries(iterableCountries[countryCode].states).map(
      ([stateCode, state]: [string, any]) =>
        ({
          code: stateCode,
          ...state,
        } as State),
    )
  );
};

export const getStateInCountry = (country: Country, stateCode: string): State =>
  country.states.find((state) => state.code === stateCode) as State;
