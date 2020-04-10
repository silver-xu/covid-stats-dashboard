import React from 'react';
import { Card, Table, Skeleton, Empty } from 'antd';
import { useQuery } from 'graphql-hooks';

import { getTopCountriesStatsQuery } from '../../../queries/getTopCountriesStatsQuery';
import { default as countries } from '../../../config/countries.json';
import { Stats } from '../../../types/Stats';

export const Top10CountriesTableCard = () => {
  const { loading, error, data } = useQuery(getTopCountriesStatsQuery());

  const top10Countries =
    data &&
    (Object.entries(data.global) as any)
      .map(([countryCode, country]: [string, Stats]) => ({
        countryCode,
        ...country,
      }))
      .filter((country: any) => country.totalConfirmedCases)
      .sort((countryA: any, countryB: any) => countryB.totalConfirmedCases - countryA.totalConfirmedCases)
      .slice(0, 10)
      .map((country: any) => ({
        name: (countries as any)[country.countryCode].name,
        ...country,
      }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total',
      dataIndex: 'totalConfirmedCases',
      key: 'totalConfirmedCases',
    },
    {
      title: 'Death',
      dataIndex: 'totalDeaths',
      key: 'totalDeaths',
    },
    {
      title: 'Recovery',
      dataIndex: 'totalRecoveredCases',
      key: 'totalRecoveredCases',
    },
  ];

  return (
    <Card style={{ height: '450px' }}>
      {!data ? (
        (loading && <Skeleton active />) || (error && <Empty />)
      ) : (
        <Table dataSource={top10Countries} columns={columns} pagination={{ pageSize: 5 }} />
      )}
    </Card>
  );
};
