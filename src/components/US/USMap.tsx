import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { geoCentroid } from 'd3';
import { getCountryByCode } from '../../services/countryServices';

const geoUrl = 'us-states-topo.json';
const us = getCountryByCode('US');
const statesGeoLookup = Object.assign(
  {},
  ...us.states!.map((state) => ({
    [state.geoName]: state.code,
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
      height={600}
      projection="geoMercator"
    >
      <ZoomableGroup center={[-110, 50]} zoom={5}>
        <Geographies geography={geoUrl} fill="#DDD">
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const statesCode = statesGeoLookup[geo.properties.name];
                const data = usStats[statesCode];
                return (
                  <Geography key={geo.rsmKey} geography={geo} fill={data ? colorScale(data[metrics], 'US') : '#EEE'} />
                );
              })}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const statesCode = statesGeoLookup[geo.properties.name];
                const data = usStats[statesCode];
                return (
                  <g key={geo.rsmKey + '-name'}>
                    {
                      <Marker coordinates={centroid}>
                        <text
                          y="2"
                          fontSize={1.5}
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
