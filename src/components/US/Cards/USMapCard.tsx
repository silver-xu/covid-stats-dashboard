import React, { useState } from 'react';
import { Card, Divider, Space, Skeleton, Empty, Radio, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useQuery } from 'graphql-hooks';

import { Statistics } from '../../Statistics';
import { Metrics, ParentStats } from '../../../types/stats';
import { getStatesMapQuery } from '../../../queries/getStatesMapQuery';
import { titleStyle } from '../../Common.styles';
import { USMap } from '../USMap';

export const USMapCard = () => {
  const [metrics, setMetrics] = useState<Metrics>('totalConfirmedCases');

  const { loading, error, data } = useQuery(getStatesMapQuery('US', metrics));
  const usStats = data && (data.global['US'] as ParentStats);

  const handleMetricsChange = (e: RadioChangeEvent) => {
    setMetrics(e.target.value);
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Divider orientation="left" style={titleStyle}>
          United States COVID19 Map
        </Divider>
        {!usStats ? (
          (loading && <Skeleton active />) || (error && <Empty />)
        ) : (
          <>
            <USMap usStats={usStats} metrics={metrics} />
            <Row justify="center">
              <Radio.Group
                value={metrics}
                size="small"
                onChange={handleMetricsChange}
                style={{ padding: '0 0 10px 0' }}
              >
                <Radio.Button value="totalConfirmedCases">Total Cases</Radio.Button>
                <Radio.Button value="newlyConfirmedCases">New Cases</Radio.Button>
                <Radio.Button value="currentConfirmedCases">Current Cases</Radio.Button>
                <Radio.Button value="totalDeaths">Deaths</Radio.Button>
              </Radio.Group>
            </Row>
            <Statistics stats={usStats} />
          </>
        )}
      </Space>
    </Card>
  );
};