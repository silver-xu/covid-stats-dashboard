import gql from 'graphql-tag';

export const getCountryStatsQuery = (countryCode: string) => gql`query{
  global{
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
    }
  }
}`;
