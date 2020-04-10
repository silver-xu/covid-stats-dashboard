import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { getCountryByCode, getStateInCountry } from '../../services/countryServices';

const geoUrl = 'china-states-topo.json';
const china = getCountryByCode('China');
const statesGeoLookup = Object.assign(
  {},
  ...china.states!.map((state) => ({
    [state.geoName]: state.code,
  })),
);

export const ChinaMap = ({ chinaStats, metrics }: { chinaStats: ParentStats; metrics: Metrics }) => {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
      }}
      height={600}
      projection="geoMercator"
    >
      <ZoomableGroup center={[105, 39]} zoom={4.5}>
        <Geographies geography={geoUrl} fill="#DDD">
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const stateCode = statesGeoLookup[geo.properties.name];
                const data = chinaStats[stateCode];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={data ? colorScale(data[metrics], 'China') : '#EEE'}
                  />
                );
              })}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const stateCode = statesGeoLookup[geo.properties.name];
                const data = chinaStats[stateCode];

                return stateCode ? (
                  <g key={geo.rsmKey + '-name'}>
                    {
                      <Marker coordinates={centroid}>
                        <text
                          y="2"
                          fontSize={2}
                          textAnchor="middle"
                          fill={data ? colorScale(data[metrics], 'China', 'fgColor') : '#333'}
                        >
                          {getStateInCountry(china, stateCode).name}
                        </text>
                      </Marker>
                    }
                  </g>
                ) : (
                  <></>
                );
              })}
            </>
          )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
