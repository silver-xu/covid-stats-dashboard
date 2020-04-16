import React from 'react';
import { Card, Divider, Skeleton, Empty } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useQuery } from '@apollo/react-hooks';

import { titleStyle } from '../../Common.styles';
import { getCountriesHistoryQuery } from '../../../queries/getCountriesHistoryQuery';
import { extractCountriesPerformance } from '../../../data/extractCountriesPerformance';
import { getCountryByCode } from '../../../services/countryServices';

export const CountriesPerformanceCard = ({ top }: { top: boolean }) => {
  const metrics = 'newlyConfirmedCases';
  const { loading, error, data } = useQuery(getCountriesHistoryQuery(metrics));
  const performance = data && extractCountriesPerformance(data, metrics, top);

  const colors = ['#003f5c', '#a05195', '#f95d6a', '#d45087', '#ff7c43', '#ffa600', '#2f4b7c', '#665191'];

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
            <AreaChart
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
                const countryName = getCountryByCode(country.countryCode)!.name;
                return (
                  <Area
                    key={index}
                    type="monotone"
                    dataKey={countryName}
                    name={countryName}
                    stroke={colors[index]}
                    fill={colors[index]}
                    isAnimationActive={false}
                    dot={false}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </Card>
  );
};
