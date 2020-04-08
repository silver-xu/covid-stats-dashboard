export const getGlobalHistoryQuery = () => {
  return `query global {
    global {
      history{
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
