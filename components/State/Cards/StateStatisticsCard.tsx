import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Skeleton, Empty, Card, Divider } from 'antd';

import { Stats } from '../../../types/Stats';
import { getStatsStatsQuery } from '../../../queries/getStateStatsQuery';
import { Statistics } from '../../Statistics';
import { titleStyle } from '../../Common.styles';
import { getStateByCode } from '../../../services/countryServices';

export const StateStatisticsCard = ({ countryCode, stateCode }: { countryCode: string; stateCode: string }) => {
  const { loading, error, data } = useQuery(getStatsStatsQuery(countryCode, stateCode));
  const stats =
    data &&
    data.global[countryCode] &&
    data.global[countryCode][stateCode] &&
    (data.global[countryCode][stateCode] as Stats);

  return (
    <>
      {!stats ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <Card>
          <Divider orientation="left" style={titleStyle}>
            {getStateByCode(countryCode, stateCode)!.name} COVID19 Statistics
          </Divider>
          <Statistics stats={stats} />
        </Card>
      )}
    </>
  );
};
