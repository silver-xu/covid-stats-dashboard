import React from 'react';
import { Space, Row, Col } from 'antd';

import { AustraliaMapCard } from './Cards/AustraliaMapCard';
import { TopStatesCard } from '../Cards/TopStatesCard';
import { CountryGrowthChartsCard } from '../Cards/CountryGrowthChartsCard';
import { TopStatsTableCard } from '../Cards/TopStatesTableCard';
import { StatesPerformanceCard } from '../State/Cards/StatesPerformanceCard';

const countryCode = 'Australia';

export const AustraliaDashboard = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <AustraliaMapCard />
      <CountryGrowthChartsCard countryCode={countryCode} />
      <Row gutter={8}>
        <Col xl={10} lg={24} md={24} sm={24} xs={24}>
          <TopStatesCard countryCode={countryCode} />
        </Col>
        <Col xl={14} lg={24} md={24} sm={24} xs={24}>
          <TopStatsTableCard countryCode={countryCode} />
        </Col>
      </Row>
      <StatesPerformanceCard countryCode={countryCode} top={true} />
    </Space>
  );
};
