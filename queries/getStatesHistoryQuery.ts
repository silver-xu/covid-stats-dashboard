import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/Stats';
import gql from 'graphql-tag';

export const getStatesHistoryQuery = (countryCode: string, metrics: Metrics) => {
  const statesQuery = Object.keys((countries as any)[countryCode].states)
    .map(
      (stateCode) => `${stateCode} {
        ${metrics}
        history{
          ${metrics}
          date
        }
      }
      `,
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
