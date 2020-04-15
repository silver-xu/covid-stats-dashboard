import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/Stats';
import gql from 'graphql-tag';

export const getTopCountriesQuery = (metrics: Metrics) => {
  const countryCodes = Object.keys(countries)
    .map(
      (countryCode) => `${countryCode} {
        ${metrics}
      }`,
    )
    .join('\r\n');

  return gql`query global {
    global {
      ${countryCodes}
    }
  }
`;
};
