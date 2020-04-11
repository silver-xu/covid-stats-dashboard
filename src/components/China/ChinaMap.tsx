import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3';
import { useHistory } from 'react-router';
import ReactTooltip from 'react-tooltip';
import { Row, Col } from 'antd';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { getCountryByCode, getStateInCountry } from '../../services/countryServices';

import { Tooltip } from '../../types/Tooltip';
import { Country } from '../../types/Country';

const geoUrl = 'china-states-topo.json';
const countryCode = 'China';
const china = getCountryByCode(countryCode) as Country;
const statesGeoLookup = Object.assign(
  {},
  ...china.states!.map((state) => ({
    [state.geoName]: state.code,
  })),
);

export const ChinaMap = ({ chinaStats, metrics }: { chinaStats: ParentStats; metrics: Metrics }) => {
  const [tooltip, setTooltip] = useState<Tooltip>();
  const history = useHistory();

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
        <ZoomableGroup center={[105, 39]} zoom={4.5}>
          <Geographies geography={geoUrl} fill="#DDD">
            {({ geographies }) =>
              geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const stateCode = statesGeoLookup[geo.properties.name];
                const data = chinaStats[stateCode];

                return stateCode ? (
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
                            const regionName = getStateInCountry(china, stateCode)?.name;
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
                            fontSize={2}
                            textAnchor="middle"
                            fill={data ? colorScale(data[metrics], countryCode, 'fgColor') : '#333'}
                          >
                            {getStateInCountry(china, stateCode)?.name}
                          </text>
                        </Marker>
                      </>
                    }
                  </g>
                ) : (
                  <></>
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
