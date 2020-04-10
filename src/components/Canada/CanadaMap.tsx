import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3';

import { ParentStats, Metrics } from '../../types/stats';
import { default as countries } from '../../config/countries.json';
import { colorScale } from '../../utils/colorScale';

const geoUrl = 'canada-states-topo.json';
const statesGeoLookup = Object.assign(
  {},
  ...Object.entries(countries.Canada.states).map(([statesCode, state]) => ({
    [state.geoName]: statesCode,
  })),
);

export const CanadaMap = ({ canadaStats, metrics }: { canadaStats: ParentStats; metrics: Metrics }) => {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
      }}
      height={600}
      projection="geoMercator"
    >
      <ZoomableGroup center={[-100, 60]} zoom={3}>
        <Geographies geography={geoUrl} fill="#DDD">
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const statesCode = statesGeoLookup[geo.properties.name];
                const data = canadaStats[statesCode];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={data ? colorScale(data[metrics], 'Canada') : '#EEE'}
                  />
                );
              })}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const statesCode = statesGeoLookup[geo.properties.name];
                const data = canadaStats[statesCode];
                return (
                  <g key={geo.rsmKey + '-name'}>
                    {
                      <Marker coordinates={centroid}>
                        <text
                          y="2"
                          fontSize={3}
                          textAnchor="middle"
                          fill={data ? colorScale(data[metrics], 'US', 'fgColor') : '#333'}
                        >
                          {geo.properties.name}
                        </text>
                      </Marker>
                    }
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
