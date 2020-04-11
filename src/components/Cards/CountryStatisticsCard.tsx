import React from 'react';
import { useQuery } from 'graphql-hooks';
import { Skeleton, Empty, Card, Divider } from 'antd';

import { Stats } from '../../types/Stats';
import { Statistics } from '../Statistics';
import { titleStyle } from '../Common.styles';
import { getCountryStatsQuery } from '../../queries/getCountryStatsQuery';
import { getCountryByCode } from '../../services/countryServices';
import { Country } from '../../types/Country';

export const CountryStatisticsCard = ({ countryCode }: { countryCode: string }) => {
  const { loading, error, data } = useQuery(getCountryStatsQuery(countryCode));
  const stats = data && (data.global[countryCode] as Stats);
  const country = getCountryByCode(countryCode) as Country;

  return (
    <>
      {!stats ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <Card>
          <Divider orientation="left" style={titleStyle}>
            {country.name} COVID19 Statistics
          </Divider>
          <Statistics stats={stats} />
        </Card>
      )}
    </>
  );
};
