import { default as countries } from '../config/countries.json';

export const getTopCountriesStatsQuery = () => {
  const countryCodes = Object.keys(countries)
    .map(
      (countryCode) => `${countryCode} {
        totalConfirmedCases
        totalDeaths
        totalRecoveredCases
      }`,
    )
    .join('\r\n');

  return `query global {
    global {
      ${countryCodes}
    }
  }
`;
};
