import React from 'react';
import { Space, Row, Col } from 'antd';

import { TopStatesCard } from '../Country/Cards/TopStatesCard';
import { CountryGrowthChartsCard } from '../Country/Cards/CountryGrowthChartsCard';
import { TopStatsTableCard } from '../Country/Cards/TopStatesTableCard';
import { CanadaMapCard } from './Cards/CanadaMapCard';

const countryCode = 'Canada';

export const CanadaDashboard = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <CanadaMapCard />
      <CountryGrowthChartsCard countryCode={countryCode} />
      <Row gutter={8}>
        <Col xl={10} lg={24} md={24} sm={24} xs={24}>
          <TopStatesCard countryCode={countryCode} take={10} />
        </Col>
        <Col xl={14} lg={24} md={24} sm={24} xs={24}>
          <TopStatsTableCard countryCode={countryCode} take={10} />
        </Col>
      </Row>
      {/* <StatesPerformanceCard countryCode={countryCode} top={true} />
      <StatesPerformanceCard countryCode={countryCode} top={false} /> */}
    </Space>
  );
};
