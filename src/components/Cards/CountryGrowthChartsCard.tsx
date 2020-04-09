import React, { useState } from 'react';
import { Card, Divider, Skeleton, Empty, Radio, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import moment from 'moment';
import { useQuery } from 'graphql-hooks';

import { titleStyle } from '../Common.styles';
import { getCountryHistoryQuery } from '../../queries/getCountryHistoryQuery';
import { nonNegative } from '../../utils/nonNegative';

type ChartType = 'casesGrowth' | 'deathRecoveryRateGrowth';

export const CountryGrowthChartsCard = ({ countryCode, chartType }: { countryCode: string; chartType?: ChartType }) => {
  const [currentChart, setCurrentChart] = useState<ChartType>(chartType || 'casesGrowth');
  const { loading, error, data } = useQuery(getCountryHistoryQuery(countryCode));

  const dataWithShortdate =
    data &&
    data.global[countryCode] &&
    data.global[countryCode].history.map((historyEntry: any) => ({
      ...historyEntry,
      newlyConfirmedCases: nonNegative(historyEntry.newlyConfirmedCases),
      totalConfirmedCases: nonNegative(historyEntry.totalConfirmedCases),
      deathRate: (historyEntry.totalDeaths / historyEntry.totalConfirmedCases).toFixed(2),
      recoveryRate: (historyEntry.totalRecoveredCases / historyEntry.totalConfirmedCases).toFixed(2),
      date: moment.utc(historyEntry.date).format('M/D'),
    }));

  const handleChartChange = (e: RadioChangeEvent) => {
    setCurrentChart(e.target.value);
  };

  return (
    <Card style={{ width: '100%' }}>
      <Divider orientation="left" style={titleStyle}>
        {currentChart === 'casesGrowth' ? 'Total Cases / Daily New Cases' : 'Death Rate / Recovery Rate'}
      </Divider>
      {!dataWithShortdate ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <>
          <ResponsiveContainer width="100%" minHeight="300px">
            <ComposedChart
              data={dataWithShortdate}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {currentChart === 'casesGrowth' && (
                <Line
                  type="monotone"
                  dataKey="totalConfirmedCases"
                  stroke="#a05195"
                  name="Total Confirmed Cases"
                  isAnimationActive={false}
                  dot={false}
                />
              )}
              {currentChart === 'casesGrowth' && (
                <Area
                  dataKey="newlyConfirmedCases"
                  fill="#f95d6a"
                  stroke="#f95d6a"
                  name="New Cases"
                  isAnimationActive={false}
                />
              )}
              {currentChart === 'deathRecoveryRateGrowth' && (
                <Line
                  type="monotone"
                  dataKey="deathRate"
                  stroke="#a05195"
                  name="Death Rate"
                  isAnimationActive={false}
                  dot={false}
                />
              )}
              {currentChart === 'deathRecoveryRateGrowth' && (
                <Line
                  type="monotone"
                  dataKey="recoveryRate"
                  stroke="#f95d6a"
                  name="Recovery Rate"
                  isAnimationActive={false}
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </>
      )}
      {!chartType && (
        <Row justify="center">
          <Radio.Group value={currentChart} size="small" onChange={handleChartChange} style={{ padding: '0 0 10px 0' }}>
            <Radio.Button value="casesGrowth">Total Cases / New Cases</Radio.Button>
            <Radio.Button value="deathRecoveryRateGrowth">Death Rate / Recovery Rate</Radio.Button>
          </Radio.Group>
        </Row>
      )}
    </Card>
  );
};
