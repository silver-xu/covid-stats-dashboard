import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/stats';

export const getMapQuery = (metrics: Metrics) => {
  const countryCodes = Object.keys(countries)
    .map(
      (countryCode) => `${countryCode} {
        ${metrics}
      }`,
    )
    .join('\r\n');

  return `query global {
    global {
      totalConfirmedCases
      currentConfirmedCases
      newlyConfirmedCases
      netNewlyConfirmedCases
      totalDeaths
      newDeaths
      totalRecoveredCases
      newlyRecoveredCases
      lastUpdatedDate

      ${countryCodes}
    }
  }
`;
};
