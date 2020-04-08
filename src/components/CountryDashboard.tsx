import React from 'react';
import { Space } from 'antd';

import { CountryGrowthChartsCard } from './Cards/CountryGrowthChartsCard';
import { CountryStatisticsCard } from './Cards/CountryStatisticsCard';

export const CountryDashboard = ({ countryCode }: { countryCode: string }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <CountryStatisticsCard countryCode={countryCode} />
      <CountryGrowthChartsCard countryCode={countryCode} chartType="casesGrowth" />
      <CountryGrowthChartsCard countryCode={countryCode} chartType="deathRecoveryRateGrowth" />
    </Space>
  );
};
