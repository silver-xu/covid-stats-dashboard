import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/Stats';
import { default as countries } from '../../config/countries.json';
import { colorScale } from '../../utils/colorScale';
import { geoCentroid } from 'd3';

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
      scale: 150,
    }}
    height={500}
    projection="geoMercator"
  >
    <ZoomableGroup zoom={1}>
      <Geographies geography={geoUrl} fill="#DDD">
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const statesCode = countriesGeoLookup[geo.properties.name];
              const data = worldStats[statesCode];
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
              const statesCode = countriesGeoLookup[geo.properties.name];
              const data = worldStats[statesCode];
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
