import React, { useState } from 'react';
import { Card, Divider, Skeleton, Empty, Radio, Row } from 'antd';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useQuery } from '@apollo/react-hooks';

import { getTopCountriesQuery } from '../../../queries/getTopCountriesQuery';
import { Stats, Metrics } from '../../../types/Stats';
import { titleStyle } from '../../Common.styles';
import { RadioChangeEvent } from 'antd/lib/radio';
import { radioButtonGroupStyles } from './Top10CountriesCard.styles';
import { getCountryByCode } from '../../../services/countryServices';

export const Top10CountriesCard = () => {
  const [metrics, setMetrics] = useState<Metrics>('totalConfirmedCases');
  const { loading, error, data } = useQuery(getTopCountriesQuery(metrics));

  const renderLabel = function (entry: any) {
    return entry.countryCode;
  };

  const handleMetricsChange = (e: RadioChangeEvent) => {
    setMetrics(e.target.value);
  };

  const top10Countries =
    data &&
    (Object.entries(data.global) as any)
      .map(([countryCode, country]: [string, Stats]) => ({
        countryCode,
        ...country,
      }))
      .filter((country: any) => country[metrics])
      .sort((countryA: any, countryB: any) => countryB[metrics] - countryA[metrics])
      .slice(0, 10)
      .map((country: any) => ({
        name: getCountryByCode(country.countryCode)!.name,
        ...country,
      }));

  const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];

  return (
    <Card style={{ height: '450px' }}>
      <Divider orientation="left" style={titleStyle}>
        Top 10 Impacted Countries
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
                data={top10Countries}
                outerRadius={80}
                fill="#8884d8"
              >
                {top10Countries.map((_: any, index: any) => (
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
