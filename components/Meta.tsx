import React from 'react';
import Head from 'next/head';

import { Stats } from '../types/Stats';
import { getCountryByCode, getStateByCode } from '../services/countryServices';
import { config } from '../config';

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
  }COVID 19 - total: ${totalConfirmedCases}, new: ${newlyConfirmedCases}, current: ${currentConfirmedCases}, net new: ${netNewlyConfirmedCases}, deaths: ${totalDeaths}, new deaths: ${newDeaths}, recovered: ${totalRecoveredCases}, new recovered: ${newlyRecoveredCases}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={description} />
      <meta property="og:image" content={config.ogImage} />
    </Head>
  );
};
