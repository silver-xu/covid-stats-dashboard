import gql from 'graphql-tag';

export const getGlobalHistoryQuery = () => {
  return gql`
    query global {
      global {
        history {
          totalConfirmedCases
          newlyConfirmedCases
          totalDeaths
          totalRecoveredCases
          date
        }
      }
    }
  `;
};
