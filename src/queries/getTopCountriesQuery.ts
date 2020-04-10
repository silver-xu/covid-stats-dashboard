import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/Stats';

export const getTopCountriesQuery = (metrics: Metrics) => {
  const countryCodes = Object.keys(countries)
    .map(
      (countryCode) => `${countryCode} {
        ${metrics}
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
