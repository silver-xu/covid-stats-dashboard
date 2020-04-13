import React from 'react';
import { Helmet } from 'react-helmet';

import { Stats } from '../types/Stats';
import { usePath } from '../utils/usePath';
import { getCountryByCode, getStateByCode } from '../services/countryServices';

export const Meta = ({ stats }: { stats: Stats }) => {
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

  const { countryCode, stateCode } = usePath();
  const countryName = !countryCode ? 'World' : getCountryByCode(countryCode)?.name;
  const stateName = countryCode && stateCode && getStateByCode(countryCode, stateCode)?.name;
  const title = `${countryName}${stateName ? ' | ' + stateName: '' } Dashboard COVID 19 Pandemic Statistics | Powered by Silver Xu`;
  const keywords = `${countryName}, ${stateName || ''}, John Hopkins, Statistics, Dashboard, COVID19, Infection, Pandemic`;
  const description = `${countryName}${
    ' | ' + stateName
  } Statistics - Total Confirmed Cases: ${totalConfirmedCases}, Newly Confirmed Cases: ${newlyConfirmedCases}, Current Confirmed Cases: ${currentConfirmedCases}, Net newly confirmed Cases: ${netNewlyConfirmedCases}, Deaths: ${totalDeaths}, New Deaths: ${newDeaths}, Recovered Cases: ${totalRecoveredCases}, Newly Recovered Cases: ${newlyRecoveredCases}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};
