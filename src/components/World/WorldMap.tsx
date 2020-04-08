import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/stats';
import { default as countries } from '../../config/countries.json';
import { colorScale } from '../../utils/colorScale';

const geoUrl = 'global-topo.json';
const countriesGeoLookup = Object.assign(
  {},
  ...Object.entries(countries).map(([countryCode, country]) => ({
    [country.geoName]: countryCode,
  })),
);

export const WorldMap = ({ worldStats, metrics }: { worldStats: ParentStats; metrics: Metrics }) => (
  <ComposableMap
    projectionConfig={{
      rotate: [-10, 0, 0],
      scale: 147,
    }}
    height={400}
  >
    <ZoomableGroup>
      <Geographies geography={geoUrl} fill="#DDD">
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryCode = countriesGeoLookup[geo.properties.name];
            const data = worldStats[countryCode];
            return <Geography key={geo.rsmKey} geography={geo} fill={data ? colorScale(data[metrics]) : '#EEE'} />;
          })
        }
      </Geographies>
    </ZoomableGroup>
  </ComposableMap>
);
