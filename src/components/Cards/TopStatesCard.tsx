import React, { useState } from 'react';
import { Card, Divider, Skeleton, Empty, Radio, Row } from 'antd';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useQuery } from 'graphql-hooks';

import { Stats, Metrics } from '../../types/stats';
import { default as countries } from '../../config/countries.json';
import { titleStyle } from '../Common.styles';
import { RadioChangeEvent } from 'antd/lib/radio';
import { radioButtonGroupStyles } from './TopStatesCard.styles';
import { getTopStatesQuery } from '../../queries/getTopStatesQuery';

export const TopStatesCard = ({ countryCode, take }: { countryCode: string; take?: number }) => {
  const [metrics, setMetrics] = useState<Metrics>('totalConfirmedCases');
  const { loading, error, data } = useQuery(getTopStatesQuery(countryCode, metrics));

  const renderLabel = function (entry: any) {
    return ((countries as any)[countryCode].states as any)[entry.stateCode].name;
  };

  const handleMetricsChange = (e: RadioChangeEvent) => {
    setMetrics(e.target.value);
  };

  const topStates =
    data &&
    (Object.entries(data.global.Australia) as any)
      .map(([stateCode, state]: [string, Stats]) => ({
        stateCode,
        ...state,
      }))
      .filter((state: any) => state[metrics])
      .sort((stateA: any, stateB: any) => stateB[metrics] - stateA[metrics])
      .slice(0, take || Number.MAX_SAFE_INTEGER)
      .map((state: any) => {
        return {
          name: ((countries as any)[countryCode].states as any)[state.stateCode].name,
          ...state,
        };
      });

  const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];

  return (
    <Card style={{ height: '450px' }}>
      <Divider orientation="left" style={titleStyle}>
        {take && `Top ${take} Impacted`} States Statistics
      </Divider>
      {!data ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey={metrics}
                isAnimationActive={false}
                label={renderLabel}
                data={topStates}
                outerRadius={80}
                fill="#8884d8"
              >
                {topStates.map((_: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
      <Row justify="center" style={radioButtonGroupStyles}>
        <Radio.Group value={metrics} size="small" onChange={handleMetricsChange}>
          <Radio.Button value="totalConfirmedCases">Total Cases</Radio.Button>
          <Radio.Button value="newlyConfirmedCases">New Cases</Radio.Button>
          <Radio.Button value="totalDeaths">Deaths</Radio.Button>
        </Radio.Group>
      </Row>
    </Card>
  );
};
