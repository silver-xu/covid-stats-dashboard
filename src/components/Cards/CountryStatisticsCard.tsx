import React from 'react';
import { useQuery } from 'graphql-hooks';
import { Skeleton, Empty, Card, Divider } from 'antd';

import { Stats } from '../../types/stats';
import { Statistics } from '../Statistics';
import { default as countries } from '../../config/countries.json';
import { titleStyle } from '../Common.styles';
import { getCountryStatsQuery } from '../../queries/getCountryStatsQuery';

export const CountryStatisticsCard = ({ countryCode }: { countryCode: string }) => {
  const { loading, error, data } = useQuery(getCountryStatsQuery(countryCode));
  const stats = data && (data.global[countryCode] as Stats);

  return (
    <>
      {!stats ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <Card>
          <Divider orientation="left" style={titleStyle}>
            {(countries as any)[countryCode].name} COVID19 Statistics
          </Divider>
          <Statistics stats={stats} />
        </Card>
      )}
    </>
  );
};
