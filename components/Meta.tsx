import React from 'react';
import Head from 'next/head';

import { Stats } from '../types/Stats';
import { getCountryByCode, getStateByCode } from '../services/countryServices';

export const Meta = ({ stats, countryCode, stateCode }: { stats: Stats; countryCode: string; stateCode?: string }) => {
  const {
    netNewlyConfirmedCases,
    currentConfirmedCases,
    newDeaths,
    newlyConfirmedCases,
    newlyRecoveredCases,
    totalConfirmedCases,
    totalDeaths,
    totalRecoveredCases,
  } = stats;

  const countryName = countryCode === 'Global' ? 'World' : getCountryByCode(countryCode)?.name;
  const stateName = countryCode && stateCode && getStateByCode(countryCode, stateCode)?.name;
  const title = `${countryName}${
    stateName ? ` | ${stateName}` : ''
  } Dashboard COVID 19 Pandemic Statistics | Powered by Silver Xu`;
  const keywords = `${countryName || 'World'}, ${
    (stateName && `${stateName}, `) || ''
  }John Hopkins, Statistics, Dashboard, COVID19, Infection, Pandemic`;
  const description = `${countryName || 'World'} | ${
    (stateName && `${stateName} | `) || ''
  }Statistics - Total Confirmed Cases: ${totalConfirmedCases}, Newly Confirmed Cases: ${newlyConfirmedCases}, Current Confirmed Cases: ${currentConfirmedCases}, Net newly confirmed Cases: ${netNewlyConfirmedCases}, Deaths: ${totalDeaths}, New Deaths: ${newDeaths}, Recovered Cases: ${totalRecoveredCases}, Newly Recovered Cases: ${newlyRecoveredCases}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={description} />
      <meta property="og:description" content={description} />
    </Head>
  );
};
