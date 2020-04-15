import React from 'react';
import { Space, Row, Col } from 'antd';
import { WorldMapCard } from './Cards/WorldMapCard';
import { WorldGrowthChartsCard } from './Cards/WorldGrowthChartsCard';
import { Top10CountriesCard } from './Cards/Top10CountriesCard';
import { Top10CountriesTableCard } from './Cards/Top10CountriesTableCard';
import { CountriesPerformanceCard } from './Cards/CountriesPerformanceCard';

export const WorldDashboard = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <WorldMapCard />
    <WorldGrowthChartsCard />
    <Row gutter={8}>
      <Col xl={10} lg={24} md={24} sm={24} xs={24}>
        <Top10CountriesCard />
      </Col>
      <Col xl={14} lg={24} md={24} sm={24} xs={24}>
        <Top10CountriesTableCard />
      </Col>
    </Row>
    <Row gutter={8}>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <CountriesPerformanceCard top={true} />
      </Col>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <CountriesPerformanceCard top={false} />
      </Col>
    </Row>
  </Space>
);
