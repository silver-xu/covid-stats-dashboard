export const getCountryStatsQuery = (countryCode: string) => `query{
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
