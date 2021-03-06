import React, { useState } from 'react';
import { Card, Divider, Skeleton, Empty, Radio, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';

import { getGlobalHistoryQuery } from '../../../queries/getGlobalHistoryQuery';
import { titleStyle } from '../../Common.styles';

type ChartType = 'casesGrowth' | 'deathRecoveryRateGrowth';

export const WorldGrowthChartsCard = () => {
  const [currentChart, setCurrentChart] = useState<ChartType>('casesGrowth');

  const { loading, error, data } = useQuery(getGlobalHistoryQuery());

  const dataWithShortdate =
    data &&
    data.global.history.map((historyEntry: any) => ({
      ...historyEntry,
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
        {currentChart === 'casesGrowth' ? 'World Total Cases / Daily New Cases' : 'Death Rate / Recovery Rate'}
      </Divider>
      {!data ? (
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
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              {currentChart === 'casesGrowth' && (
                <Bar
                  dataKey="newlyConfirmedCases"
                  yAxisId="right"
                  fill="#dddddd"
                  stroke="#dddddd"
                  name="New Cases"
                  isAnimationActive={false}
                />
              )}
              {currentChart === 'casesGrowth' && (
                <Line
                  type="monotone"
                  yAxisId="left"
                  dataKey="totalConfirmedCases"
                  stroke="#a05195"
                  name="Total Confirmed Cases"
                  isAnimationActive={false}
                  dot={false}
                />
              )}
              {currentChart === 'deathRecoveryRateGrowth' && (
                <Line
                  type="monotone"
                  yAxisId="left"
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
                  yAxisId="right"
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
      <Row justify="center">
        <Radio.Group value={currentChart} size="small" onChange={handleChartChange} style={{ padding: '0 0 10px 0' }}>
          <Radio.Button value="casesGrowth">Total Cases / New Cases</Radio.Button>
          <Radio.Button value="deathRecoveryRateGrowth">Death Rate / Recovery Rate</Radio.Button>
        </Radio.Group>
      </Row>
    </Card>
  );
};
