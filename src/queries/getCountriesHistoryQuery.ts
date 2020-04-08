import { default as countries } from '../config/countries.json';
import { Metrics } from '../types/stats';

export const getCountriesHistoryQuery = (metrics: Metrics) => {
  const countryCodes = Object.keys(countries)
    .map(
      (countryCode) => `${countryCode} {
        ${metrics}
        history{
          ${metrics}
          date
        }
      }
      `,
    )
    .join('\r\n');

  return `query global {
    global {
      ${countryCodes}
    }
  }
`;
};
