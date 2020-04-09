import moment from 'moment';

import { default as countriesInfo } from '../config/countries.json';
import { Stats } from '../types/stats';

export const extractCountriesPerformance = (data: any, metrics: string, topPerforming: boolean) => {
  const countriesStats = (Object.entries(data.global) as any)
    .map(([countryCode, country]: [string, Stats]) => ({
      countryCode,
      ...country,
    }))
    .filter((country: any) => country[metrics]);

  const countriesMaxHistory = countriesStats.map((country: any) => ({
    countryCode: country.countryCode,
    maxDay: country.history
      .slice(0, country.history.length - 7)
      .reduce((accum: any, current: any) => (current[metrics] > accum[metrics] ? current : accum)),
  }));
  const countryRates = countriesStats.map((country: any) => {
    const countryMax = countriesMaxHistory.find((countryMax: any) => countryMax.countryCode === country.countryCode);
    const lastHistory = country.history[country.history.length - 1];
    const rate = (
      ((lastHistory[metrics] - countryMax!.maxDay[metrics]) /
        moment.utc(lastHistory.date).diff(moment.utc(countryMax.maxDay.date), 'days')) as number
    ).toFixed(2);
    return {
      countryCode: country.countryCode,
      rate,
      history: country.history.slice(country.history.length - 15, country.history.length - 1),
    };
  });
  const listedCountries = topPerforming
    ? countryRates.sort((countryRateA: any, countryRateB: any) => countryRateA.rate - countryRateB.rate).slice(0, 5)
    : countryRates.sort((countryRateA: any, countryRateB: any) => countryRateB.rate - countryRateA.rate).slice(0, 5);

  const results = listedCountries
    .map((listedCountry: any) => {
      const results: any = [];
      listedCountry.history.forEach((historyEntry: any) => {
        const result: any = { date: moment.utc(historyEntry.date).format('M/D') };
        const countryName = (countriesInfo as any)[listedCountry.countryCode].name;
        result[countryName] = historyEntry[metrics];
        results.push(result);
      });
      return results;
    })
    .flat();
  const statistics = results
    .reduce((accum: any, current: any) => {
      const existingEntry = accum.find((entry: any) => entry.date === current.date);
      if (existingEntry) {
        Object.entries(current).forEach(([key, value]: [any, any]) => {
          existingEntry[key] = value;
        });
      } else {
        accum.push(current);
      }
      return accum;
    }, [])
    .sort(
      (statisticA: any, statisticB: any) => moment.utc(statisticA.date).unix() - moment.utc(statisticB.date).unix(),
    );
  return { statistics, listedCountries };
};
