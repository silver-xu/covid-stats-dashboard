import React from 'react';
import { useQuery } from 'graphql-hooks';
import { Skeleton, Empty, Card, Divider } from 'antd';

import { Stats } from '../../../types/Stats';
import { getStatsStatsQuery } from '../../../queries/getStateStatsQuery';
import { Statistics } from '../../Statistics';
import { default as countries } from '../../../config/countries.json';
import { titleStyle } from '../../Common.styles';

export const StateStatisticsCard = ({ countryCode, stateCode }: { countryCode: string; stateCode: string }) => {
  const { loading, error, data } = useQuery(getStatsStatsQuery(countryCode, stateCode));
  const stats = data && data.global[countryCode][stateCode] && (data.global[countryCode][stateCode] as Stats);

  return (
    <>
      {!stats ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <Card>
          <Divider orientation="left" style={titleStyle}>
            {(countries as any)[countryCode].states[stateCode].name} COVID19 Statistics
          </Divider>
          <Statistics stats={stats} />
        </Card>
      )}
    </>
  );
};
