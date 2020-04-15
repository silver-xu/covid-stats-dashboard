import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/Stats';
import gql from 'graphql-tag';

export const getTopStatesQuery = (countryCode: string, metrics: Metrics) => {
  const statesQuery = Object.keys((countries as any)[countryCode].states)
    .map(
      (stateCode) => `${stateCode} {
        ${metrics}
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
