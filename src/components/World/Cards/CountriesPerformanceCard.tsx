import React from 'react';
import { Card, Divider, Skeleton, Empty } from 'antd';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart } from 'recharts';
import { useQuery } from 'graphql-hooks';

import { titleStyle } from '../../Common.styles';
import { getCountriesHistoryQuery } from '../../../queries/getCountriesHistoryQuery';
import { extractCountriesPerformance } from '../../../data/extractCountriesPerformance';
import { getCountryByCode } from '../../../services/countryServices';

export const CountriesPerformanceCard = ({ top }: { top: boolean }) => {
  const metrics = 'newlyConfirmedCases';
  const { loading, error, data } = useQuery(getCountriesHistoryQuery(metrics));
  const performance = data && extractCountriesPerformance(data, metrics, top);

  const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];

  return (
    <Card style={{ width: '100%' }}>
      <Divider orientation="left" style={titleStyle}>
        Most {top ? 'Improved' : 'Worsened'} Countries on New Cases
      </Divider>
      {!data ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <>
          <ResponsiveContainer width="100%" minHeight="300px">
            <LineChart
              data={performance.statistics}
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
              {performance.listedCountries.map((country: any, index: number) => {
                const countryName = getCountryByCode(country.countryCode).name;
                return (
                  <Line
                    type="monotone"
                    dataKey={countryName}
                    name={countryName}
                    stroke={colors[index]}
                    isAnimationActive={false}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </Card>
  );
};
