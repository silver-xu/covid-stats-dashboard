import gql from "graphql-tag";

export const getStatsStatsQuery = (countryCode: string, stateCode: string) => gql`query{
  global{
    ${countryCode} {
      ${stateCode} {
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
  }
}`;
