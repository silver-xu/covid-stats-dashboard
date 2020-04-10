import React from 'react';
import { Card, Table, Skeleton, Empty } from 'antd';
import { useQuery } from 'graphql-hooks';

import { default as countries } from '../../config/countries.json';
import { Stats } from '../../types/Stats';
import { getTopStatesStatsQuery } from '../../queries/getTopStatesStatsQuery';

export const TopStatsTableCard = ({ countryCode, take }: { countryCode: string; take?: number }) => {
  const { loading, error, data } = useQuery(getTopStatesStatsQuery(countryCode));

  const topStates =
    data &&
    (Object.entries(data.global[countryCode]) as any)
      .map(([stateCode, state]: [string, Stats]) => ({
        stateCode: stateCode,
        ...state,
      }))
      .filter((state: any) => state.totalConfirmedCases)
      .sort((stateA: any, stateB: any) => stateB.totalConfirmedCases - stateA.totalConfirmedCases)
      .slice(0, take || Number.MAX_SAFE_INTEGER)
      .map((state: any) => ({
        name: ((countries as any)[countryCode] as any).states[state.stateCode].name,
        ...state,
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
        <Table dataSource={topStates} columns={columns} pagination={{ pageSize: 5 }} />
      )}
    </Card>
  );
};
