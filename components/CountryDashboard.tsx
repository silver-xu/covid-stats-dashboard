import React from 'react';
import { Space } from 'antd';

import { CountryGrowthChartsCard } from './Country/Cards/CountryGrowthChartsCard';
import { CountryStatisticsCard } from './Country/Cards/CountryStatisticsCard';

export const CountryDashboard = ({ countryCode }: { countryCode: string }) => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <CountryStatisticsCard countryCode={countryCode} />
    <CountryGrowthChartsCard countryCode={countryCode} chartType="casesGrowth" />
    <CountryGrowthChartsCard countryCode={countryCode} chartType="deathRecoveryRateGrowth" />
  </Space>
);
