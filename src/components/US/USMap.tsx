import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router';
import ReactTooltip from 'react-tooltip';
import { geoCentroid } from 'd3';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { getCountryByCode, getStateInCountry } from '../../services/countryServices';
import { Tooltip } from '../../types/Tooltip';
import { Country } from '../../types/Country';

const geoUrl = 'us-states-topo.json';
const countryCode = 'US';
const us = getCountryByCode(countryCode) as Country;
const statesGeoLookup = Object.assign(
  {},
  ...us.states!.map((state) => ({
    [state.geoName]: state.code,
  })),
);

export const USMap = ({ usStats, metrics }: { usStats: ParentStats; metrics: Metrics }) => {
  const [tooltip, setTooltip] = useState<Tooltip>();
  const history = useHistory();
  return (
    <>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 100,
          // xOffset: 50,
          // yOffset: 50,
        }}
        height={600}
        projection="geoMercator"
        data-tip=""
      >
        <ZoomableGroup center={[-110, 50]} zoom={5}>
          <Geographies geography={geoUrl} fill="#DDD">
            {({ geographies }) =>
              geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const stateCode = statesGeoLookup[geo.properties.name];
                const data = usStats[stateCode];
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
                            const regionName = getStateInCountry(us, stateCode)?.name;
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
                            stateCode && history.push(`/${countryCode}/${stateCode}`);
                          }}
                        />

                        <Marker coordinates={centroid}>
                          <text
                            y="2"
                            fontSize={1.5}
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
