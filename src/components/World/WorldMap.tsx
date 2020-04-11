import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router';
import ReactTooltip from 'react-tooltip';
import { geoCentroid } from 'd3';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { getCountries, getCountryByCode } from '../../services/countryServices';
import { Tooltip } from '../../types/Tooltip';

const geoUrl = 'global-topo.json';
const countriesGeoLookup = Object.assign(
  {},
  ...getCountries().map((country) => ({
    [country.geoName]: country.code,
  })),
);

export const WorldMap = ({ worldStats, metrics }: { worldStats: ParentStats; metrics: Metrics }) => {
  const [tooltip, setTooltip] = useState<Tooltip>();
  const history = useHistory();

  return (
    <>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 150,
        }}
        height={500}
        projection="geoMercator"
        data-tip=""
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl} fill="#DDD">
            {({ geographies }) =>
              geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const countryCode = countriesGeoLookup[geo.properties.name];
                const data = worldStats[countryCode];
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
                          fill={data ? colorScale(data[metrics], undefined) : '#EEE'}
                          onMouseEnter={() => {
                            const regionName = getCountryByCode(countryCode)?.name;

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
                            if (countryCode) {
                              history.push(`/${countryCode}`);
                            }
                          }}
                        />
                        <Marker coordinates={centroid}>
                          <text
                            y="2"
                            fontSize={3}
                            textAnchor="middle"
                            fill={data ? colorScale(data[metrics], undefined, 'fgColor') : '#333'}
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
