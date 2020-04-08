export const getCountryHistoryQuery = (countryCode: string) => {
  return `query global {
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
