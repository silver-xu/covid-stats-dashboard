import { default as countries } from '../config/countries.json';
import gql from 'graphql-tag';

export const getTopStatesStatsQuery = (countryCode: string) => {
  const statesQuery = Object.keys((countries as any)[countryCode].states)
    .map(
      (stateCode) => `${stateCode} {
        totalConfirmedCases
        totalDeaths
        totalRecoveredCases
      }`,
    )
    .join('\r\n');

  return gql`query global {
    global {
      ${countryCode} {
        ${statesQuery}
      }
    }
  }
`;
};
