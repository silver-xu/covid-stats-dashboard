import React, { useState } from 'react';
import { Card, Divider, Space, Skeleton, Empty, Radio, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useQuery } from '@apollo/react-hooks';

import { Statistics } from '../../Statistics';
import { Metrics, ParentStats } from '../../../types/Stats';
import { getStatesMapQuery } from '../../../queries/getStatesMapQuery';
import { titleStyle } from '../../Common.styles';
import { CanadaMap } from '../CanadaMap';

export const CanadaMapCard = () => {
  const [metrics, setMetrics] = useState<Metrics>('totalConfirmedCases');

  const { loading, error, data } = useQuery(getStatesMapQuery('Canada', metrics));
  const canadaStats = data && (data.global['Canada'] as ParentStats);

  const handleMetricsChange = (e: RadioChangeEvent) => {
    setMetrics(e.target.value);
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Divider orientation="left" style={titleStyle}>
          Canada COVID19 Map
        </Divider>
        {!canadaStats ? (
          (loading && <Skeleton active />) || (error && <Empty />)
        ) : (
          <>
            <CanadaMap canadaStats={canadaStats} metrics={metrics} />
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
                <Radio.Button value="newDeaths">New Deaths</Radio.Button>
              </Radio.Group>
            </Row>
            <Statistics stats={canadaStats} />
          </>
        )}
      </Space>
    </Card>
  );
};
