import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { geoCentroid } from 'd3';
import { getCountryByCode, getStateInCountry } from '../../services/countryServices';
import { Tooltip } from '../../types/Tooltip';
import { Country } from '../../types/Country';

const geoUrl = '/au-states-topo.json';
const countryCode = 'Australia';
const australia = getCountryByCode(countryCode) as Country;
const statesGeoLookup = Object.assign(
  {},
  ...australia.states!.map((state) => ({
    [state.geoName]: state.code,
  })),
);

export const AustraliaMap = ({ australiaStats, metrics }: { australiaStats: ParentStats; metrics: Metrics }) => {
  const [tooltip, setTooltip] = useState<Tooltip>();
  const router = useRouter();

  return (
    <>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        height={400}
        projection="geoMercator"
        data-tip=""
      >
        <ZoomableGroup center={[132, -28]} zoom={4}>
          <Geographies geography={geoUrl} fill="#DDD">
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateCode = statesGeoLookup[geo.properties.name];
                const data = australiaStats[stateCode];
                const centroid = geoCentroid(geo);

                return (
                  <>
                    <Geography
                      style={{
                        hover: {
                          fill: '#1890ff',
                          cursor: 'pointer',
                        },
                      }}
                      onMouseEnter={() => {
                        const regionName = getStateInCountry(australia, stateCode)?.name;
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
                      key={geo.rsmKey}
                      geography={geo}
                      fill={data ? colorScale(data[metrics], countryCode) : '#EEE'}
                    />
                    <Marker coordinates={centroid}>
                      <text
                        style={{
                          cursor: 'pointer',
                        }}
                        y="2"
                        fontSize={3}
                        textAnchor="middle"
                        fill={data ? colorScale(data[metrics], countryCode, 'fgColor') : '#333'}
                      >
                        {geo.properties.name}
                      </text>
                    </Marker>
                  </>
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
