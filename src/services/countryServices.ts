import { default as countries } from '../config/countries.json';
import { Country } from '../types/Country';
import { State } from '../types/State';

export const getCountryByCode = (countryCode: string): Country | undefined => {
  const iterableCountries = countries as any;
  const country = iterableCountries[countryCode];

  return (
    country && {
      code: countryCode,
      name: country.name,
      geoName: country.geoName,
      states: getStatesByCountryCode(countryCode),
    }
  );
};

export const getStateByCode = (countryCode: string, stateCode: string): State | undefined => {
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
        name: country.name,
        geoName: country.geoName,
        states: getStatesByCountryCode(countryCode),
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
          name: state.name,
          geoName: state.geoName,
        } as State),
    )
  );
};

export const getStateInCountry = (country: Country, stateCode: string): State | undefined =>
  country.states && (country.states.find((state) => state.code === stateCode) as State);

export const getCountryByStateCode = (stateCode: string): Country =>
  getCountries().find((country) => country.states && country.states.find((state) => state.code === stateCode)) as
  Country;

export const isCountry = (code: string): boolean => {
  const iterableCountries = countries as any;
  return !!iterableCountries[code];
};
