import { default as countries } from '../config/countries.json';
import gql from 'graphql-tag';

export const getTopCountriesStatsQuery = () => {
  const countryCodes = Object.keys(countries)
    .map(
      (countryCode) => `${countryCode} {
        totalConfirmedCases
        totalDeaths
        totalRecoveredCases
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
