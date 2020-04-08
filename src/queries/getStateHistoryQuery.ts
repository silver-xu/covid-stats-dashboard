export const getStateHistoryQuery = (countryCode: string, stateCode: string) => {
  return `query global {
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
