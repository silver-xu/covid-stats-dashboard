import React from 'react';
import { Row, Col, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  MedicineBoxOutlined,
  LikeOutlined,
  ClockCircleOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';

import { Stats } from '../types/Stats';
import { statisticStyles, negativeValueStyles, positiveValueStyles } from './Statistics.styles';

export const Statistics = ({ stats }: { stats: Stats }) => {
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

  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="Total cases"
            value={totalConfirmedCases}
            valueStyle={negativeValueStyles}
            prefix={<ReconciliationOutlined />}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="Current cases"
            value={currentConfirmedCases}
            valueStyle={netNewlyConfirmedCases > 0 ? negativeValueStyles : positiveValueStyles}
            prefix={<ClockCircleOutlined />}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="Total death"
            value={totalDeaths}
            valueStyle={totalDeaths > 0 ? negativeValueStyles : positiveValueStyles}
            prefix={<MedicineBoxOutlined />}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="Recovered"
            value={totalRecoveredCases}
            valueStyle={positiveValueStyles}
            prefix={<LikeOutlined />}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="New cases"
            value={newlyConfirmedCases}
            valueStyle={netNewlyConfirmedCases > 0 ? negativeValueStyles : positiveValueStyles}
            prefix={newlyConfirmedCases > 0 ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
          />
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="Net new cases"
            value={netNewlyConfirmedCases}
            valueStyle={netNewlyConfirmedCases > 0 ? negativeValueStyles : positiveValueStyles}
            prefix={
              netNewlyConfirmedCases > 0 ? (
                <ArrowUpOutlined />
              ) : netNewlyConfirmedCases === 0 ? (
                <ArrowLeftOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="New death"
            value={newDeaths}
            valueStyle={newDeaths > 0 ? negativeValueStyles : positiveValueStyles}
            prefix={newDeaths > 0 ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Statistic
            style={statisticStyles}
            title="Newly recovered"
            value={newlyRecoveredCases}
            valueStyle={positiveValueStyles}
            prefix={newlyRecoveredCases > 0 ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
          />
        </Col>
      </Row>
    </>
  );
};
