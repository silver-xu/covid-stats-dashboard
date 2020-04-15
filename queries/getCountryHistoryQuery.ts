import gql from 'graphql-tag';

export const getCountryHistoryQuery = (countryCode: string) => {
  return gql`query global {
    global {
      ${countryCode} {
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
`;
};
