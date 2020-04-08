import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/stats';
import { default as countries } from '../../config/countries.json';
import { colorScale } from '../../utils/colorScale';

const geoUrl = 'au-states-topo.json';
const statesGeoLookup = Object.assign(
  {},
  ...Object.entries(countries.Australia.states).map(([statesCode, state]) => ({
    [state.geoName]: statesCode,
  })),
);
export const AustraliaMap = ({ australiaStats, metrics }: { australiaStats: ParentStats; metrics: Metrics }) => {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
      height={400}
      projection="geoMercator"
    >
      <ZoomableGroup center={[132, -28]} zoom={4}>
        <Geographies geography={geoUrl} fill="#DDD">
          {({ geographies }) =>
            geographies.map((geo) => {
              const statesCode = statesGeoLookup[geo.properties.name];
              const data = australiaStats[statesCode];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={data ? colorScale(data[metrics], 'Australia') : '#EEE'}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
