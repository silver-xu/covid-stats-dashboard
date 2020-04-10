import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';

import { ParentStats, Metrics } from '../../types/Stats';
import { colorScale } from '../../utils/colorScale';
import { geoCentroid } from 'd3';
import { getCountryByCode } from '../../services/countryServices';

const geoUrl = 'au-states-topo.json';
const australia = getCountryByCode('Australia');
const statesGeoLookup = Object.assign(
  {},
  ...australia.states!.map((state) => ({
    [state.geoName]: state.code,
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
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const statesCode = statesGeoLookup[geo.properties.name];
                const data = australiaStats[statesCode];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={data ? colorScale(data[metrics], 'Australia') : '#EEE'}
                  />
                );
              })}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const statesCode = statesGeoLookup[geo.properties.name];
                const data = australiaStats[statesCode];
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
