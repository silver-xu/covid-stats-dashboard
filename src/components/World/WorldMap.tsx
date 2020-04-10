import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { geoCentroid } from 'd3';
import { getCountries } from '../../services/countryServices';

const geoUrl = 'global-topo.json';
const countriesGeoLookup = Object.assign(
  {},
  ...getCountries().map((country) => ({
    [country.geoName]: country.code,
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
              if (statesCode === 'US') {
                debugger;
              }
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={data ? colorScale(data[metrics], undefined) : '#EEE'}
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
                        fill={data ? colorScale(data[metrics], undefined, 'fgColor') : '#333'}
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
