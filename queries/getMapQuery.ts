import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/Stats';
import gql from 'graphql-tag';

export const getMapQuery = (metrics: Metrics) => {
  const countryCodes = Object.keys(countries)
    .map(
      (countryCode) => `${countryCode} {
        ${metrics}
      }`,
    )
    .join('\r\n');

  return gql`query global {
    global {
      totalConfirmedCases
      currentConfirmedCases
      newlyConfirmedCases
      netNewlyConfirmedCases
      totalDeaths
      newDeaths
      totalRecoveredCases
      newlyRecoveredCases
      lastUpdatedDate

      ${countryCodes}
    }
  }
`;
};
