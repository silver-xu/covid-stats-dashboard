import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/stats';
import { default as countries } from '../../config/countries.json';
import { colorScale } from '../../utils/colorScale';

const geoUrl = 'china-states-topo.json';
const statesGeoLookup = Object.assign(
  {},
  ...Object.entries(countries.China.states).map(([statesCode, state]) => ({
    [state.geoName]: statesCode,
  })),
);

export const ChinaMap = ({ chinaStats, metrics }: { chinaStats: ParentStats; metrics: Metrics }) => {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
      }}
      height={400}
      projection="geoMercator"
    >
      <ZoomableGroup center={[100, 40]} zoom={3}>
        <Geographies geography={geoUrl} fill="#DDD">
          {({ geographies }) =>
            geographies.map((geo) => {
              const statesCode = statesGeoLookup[geo.properties.name];
              const data = chinaStats[statesCode];
              return (
                <Geography key={geo.rsmKey} geography={geo} fill={data ? colorScale(data[metrics], 'China') : '#EEE'} />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
