import React from 'react';
import { Space } from 'antd';

import { StateStatisticsCard } from './Cards/StateStatisticsCard';
import { StateGrowthChartsCard } from './Cards/StateGrowthChartsCard';

export const StateDashboard = ({ countryCode, stateCode }: { countryCode: string; stateCode: string }) => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <StateStatisticsCard countryCode={countryCode} stateCode={stateCode} />
    <StateGrowthChartsCard countryCode={countryCode} stateCode={stateCode} chartType="casesGrowth" />
    <StateGrowthChartsCard countryCode={countryCode} stateCode={stateCode} chartType="deathRecoveryRateGrowth" />
    {/* <Row gutter={8}>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <TopStatesCard countryCode={countryCode} />
      </Col>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <TopStatsTableCard countryCode={countryCode} />
      </Col>
    </Row>
    <StatesPerformanceCard countryCode={countryCode} top={true} /> */}
  </Space>
);
