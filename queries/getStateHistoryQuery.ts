import gql from 'graphql-tag';

export const getStateHistoryQuery = (countryCode: string, stateCode: string) => {
  return gql`query global {
    global {
      ${countryCode} {
        ${stateCode}{
          history{
            totalConfirmedCases
            newlyConfirmedCases
            totalDeaths
            totalRecoveredCases
            date
          }
        }
      }
    }
  }
`;
};
