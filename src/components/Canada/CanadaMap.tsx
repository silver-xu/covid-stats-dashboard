import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

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
      height={400}
      projection="geoMercator"
    >
      <ZoomableGroup center={[-80, 70]} zoom={1.2}>
        <Geographies geography={geoUrl} fill="#DDD">
          {({ geographies }) =>
            geographies.map((geo) => {
              const statesCode = statesGeoLookup[geo.properties.name];
              const data = canadaStats[statesCode];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={data ? colorScale(data[metrics], 'Canada') : '#EEE'}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
