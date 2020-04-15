import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3';
import ReactTooltip from 'react-tooltip';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { getCountryByCode, getStateInCountry } from '../../services/countryServices';
import { Tooltip } from '../../types/Tooltip';
import { Country } from '../../types/Country';

const geoUrl = '/canada-states-topo.json';

const countryCode = 'Canada';
const canada = getCountryByCode(countryCode) as Country;
const statesGeoLookup = Object.assign(
  {},
  ...canada.states!.map((state) => ({
    [state.geoName]: state.code,
  })),
);

export const CanadaMap = ({ canadaStats, metrics }: { canadaStats: ParentStats; metrics: Metrics }) => {
  const [tooltip, setTooltip] = useState<Tooltip>();
  const router = useRouter();

  return (
    <>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
        }}
        height={600}
        projection="geoMercator"
        data-tip=""
      >
        <ZoomableGroup center={[-100, 60]} zoom={3}>
          <Geographies geography={geoUrl} fill="#DDD">
            {({ geographies }) =>
              geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const stateCode = statesGeoLookup[geo.properties.name];
                const data = canadaStats[stateCode];
                return (
                  <g key={geo.rsmKey + '-name'}>
                    {
                      <>
                        <Geography
                          style={{
                            hover: {
                              fill: '#1890ff',
                              cursor: 'pointer',
                            },
                          }}
                          key={geo.rsmKey}
                          geography={geo}
                          fill={data ? colorScale(data[metrics], countryCode) : '#EEE'}
                          onMouseEnter={() => {
                            const regionName = getStateInCountry(canada, stateCode)?.name;
                            setTooltip(
                              regionName
                                ? {
                                    regionName,
                                    metric: data[metrics],
                                  }
                                : undefined,
                            );
                          }}
                          onClick={() => {
                            stateCode && router.push(`/Dashboard/${countryCode}/${stateCode}`);
                          }}
                        />
                        <Marker coordinates={centroid}>
                          <text
                            y="2"
                            fontSize={3}
                            textAnchor="middle"
                            fill={data ? colorScale(data[metrics], countryCode, 'fgColor') : '#333'}
                          >
                            {geo.properties.name}
                          </text>
                        </Marker>
                      </>
                    }
                  </g>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip>
        {tooltip && (
          <div>
            <b>{tooltip?.regionName}</b>
            <Row>
              <Col style={{ width: '60px', textAlign: 'right' }}>Number:</Col>
              <Col style={{ width: '40px', textAlign: 'right' }}>{tooltip?.metric}</Col>
            </Row>
          </div>
        )}
      </ReactTooltip>
    </>
  );
};
