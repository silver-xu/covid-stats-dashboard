import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/Stats';
import gql from 'graphql-tag';

export const getStatesMapQuery = (countryCode: string, metrics: Metrics) => {
  const stateCodes = Object.keys((countries as any)[countryCode]['states'])
    .map(
      (stateCode) => `${stateCode} {
        ${metrics}
      }`,
    )
    .join('\r\n');

  return gql`query global {
    global {
      ${metrics}

      ${countryCode} {
        totalConfirmedCases
        currentConfirmedCases
        newlyConfirmedCases
        netNewlyConfirmedCases
        totalDeaths
        newDeaths
        totalRecoveredCases
        newlyRecoveredCases
        lastUpdatedDate

        ${stateCodes}
      }
    }
  }
`;
};
