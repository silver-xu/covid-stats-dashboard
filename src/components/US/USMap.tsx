import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/stats';
import { default as countries } from '../../config/countries.json';
import { colorScale } from '../../utils/colorScale';

const geoUrl = 'us-states-topo.json';
const statesGeoLookup = Object.assign(
  {},
  ...Object.entries(countries.US.states).map(([statesCode, state]) => ({
    [state.geoName]: statesCode,
  })),
);

export const USMap = ({ usStats, metrics }: { usStats: ParentStats; metrics: Metrics }) => {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 100,
        // xOffset: 50,
        // yOffset: 50,
      }}
      height={400}
      projection="geoMercator"
    >
      <ZoomableGroup center={[-110, 50]} zoom={2.5}>
        <Geographies geography={geoUrl} fill="#DDD">
          {({ geographies }) =>
            geographies.map((geo) => {
              const statesCode = statesGeoLookup[geo.properties.name];
              const data = usStats[statesCode];
              return (
                <Geography key={geo.rsmKey} geography={geo} fill={data ? colorScale(data[metrics], 'US') : '#EEE'} />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
