export const getStatsStatsQuery = (countryCode: string, stateCode: string) => `query{
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
