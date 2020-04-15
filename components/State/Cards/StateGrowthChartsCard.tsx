import React from 'react';
import { Card, Divider, Skeleton, Empty } from 'antd';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';

import { titleStyle } from '../../Common.styles';
import { getStateHistoryQuery } from '../../../queries/getStateHistoryQuery';
import { nonNegative } from '../../../utils/nonNegative';

type ChartType = 'casesGrowth' | 'deathRecoveryRateGrowth';

export const StateGrowthChartsCard = ({
  countryCode,
  stateCode,
  chartType,
}: {
  countryCode: string;
  stateCode: string;
  chartType: ChartType;
}) => {
  const { loading, error, data } = useQuery(getStateHistoryQuery(countryCode, stateCode));

  const dataWithShortdate =
    data &&
    data.global[countryCode] &&
    data.global[countryCode][stateCode] &&
    data.global[countryCode][stateCode].history.map((historyEntry: any) => ({
      ...historyEntry,
      newlyConfirmedCases: nonNegative(historyEntry.newlyConfirmedCases),
      totalConfirmedCases: nonNegative(historyEntry.totalConfirmedCases),
      deathRate: (historyEntry.totalDeaths / historyEntry.totalConfirmedCases).toFixed(2),
      recoveryRate: (historyEntry.totalRecoveredCases / historyEntry.totalConfirmedCases).toFixed(2),
      date: moment.utc(historyEntry.date).format('M/D'),
    }));

  return (
    <Card style={{ width: '100%' }}>
      <Divider orientation="left" style={titleStyle}>
        {chartType === 'casesGrowth' ? 'Total Cases / Daily New Cases' : 'Death Rate / Recovery Rate'}
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
              {chartType === 'casesGrowth' && (
                <Line
                  type="monotone"
                  dataKey="totalConfirmedCases"
                  stroke="#a05195"
                  name="Total Confirmed Cases"
                  isAnimationActive={false}
                  dot={false}
                />
              )}
              {chartType === 'casesGrowth' && (
                <Area
                  dataKey="newlyConfirmedCases"
                  fill="#f95d6a"
                  stroke="#f95d6a"
                  name="New Cases"
                  isAnimationActive={false}
                />
              )}
              {chartType === 'deathRecoveryRateGrowth' && (
                <Line
                  type="monotone"
                  dataKey="deathRate"
                  stroke="#a05195"
                  name="Death Rate"
                  isAnimationActive={false}
                  dot={false}
                />
              )}
              {chartType === 'deathRecoveryRateGrowth' && (
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
    </Card>
  );
};
