import moment from 'moment';

import { default as countriesInfo } from '../config/countries.json';
import { Stats } from '../types/Stats';
import { nonNegative } from '../utils/nonNegative';

export const extractStatesPerformance = (countryCode: string, data: any, metrics: string, topPerforming: boolean) => {
  const statesStats = (Object.entries(data.global[countryCode]) as any)
    .map(([stateCode, state]: [string, Stats]) => ({
      stateCode,
      ...state,
    }))
    .filter((state: any) => state[metrics]);

  const statesMaxHistory = statesStats.map((state: any) => ({
    stateCode: state.stateCode,
    maxDay: state.history
      .slice(0, state.history.length - 7)
      .reduce((accum: any, current: any) => (current[metrics] > accum[metrics] ? current : accum)),
  }));

  const statesRates = statesStats.map((state: any) => {
    const stateMax = statesMaxHistory.find((stateMax: any) => stateMax.stateCode === state.stateCode);
    const lastHistory = state.history[state.history.length - 1];
    const rate = (((lastHistory[metrics] - stateMax!.maxDay[metrics]) /
      moment.utc(lastHistory.date).diff(moment.utc(stateMax.maxDay.date), 'days')) as number).toFixed(2);

    return {
      stateCode: state.stateCode,
      rate,
      history: state.history.slice(state.history.length - 29, state.history.length - 1),
    };
  });
  const listedStates = topPerforming
    ? statesRates.sort((stateRateA: any, stateRateB: any) => stateRateA.rate - stateRateB.rate).slice(0, 5)
    : statesRates.sort((stateRateA: any, stateRateB: any) => stateRateB.rate - stateRateA.rate).slice(0, 5);

  const results = listedStates
    .map((listedState: any) => {
      const results: any = [];
      listedState.history.forEach((historyEntry: any) => {
        const result: any = { date: moment.utc(historyEntry.date).format('M/D') };
        const stateName = (countriesInfo as any)[countryCode].states[listedState.stateCode].name;
        result[stateName] = historyEntry[metrics];
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
          existingEntry[key] = nonNegative(value);
        });
      } else {
        accum.push(current);
      }
      return accum;
    }, [])
    .sort(
      (statisticA: any, statisticB: any) => moment.utc(statisticA.date).unix() - moment.utc(statisticB.date).unix(),
    );
  return { statistics, listedStates };
};
