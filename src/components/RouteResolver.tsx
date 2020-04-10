import React from 'react';
import { WorldDashboard } from './World/WorldDashboard';
import { AustraliaDashboard } from './Australia/AustraliaDashboard';
import { USDashboard } from './US/USDashboard';
import { ChinaDashboard } from './China/ChinaDashboard';
import { CanadaDashboard } from './Canada/CanadaDashboard';
import { CountryDashboard } from './CountryDashboard';
import { StateDashboard } from './State/StateDashboard';

export const RouteResolver = ({ match, location, history }: { match: any; location: any; history: any }) => {
  const { pathname: url } = location;
  if (url === '/') {
    return <WorldDashboard />;
  }

  const [countryCode, stateCode] = url.split('/').filter((token: string) => token.length > 0);

  if (countryCode) {
    if (stateCode) {
      return <StateDashboard countryCode={countryCode} stateCode={stateCode} />;
    } else {
      switch (countryCode) {
        case 'Australia':
          return <AustraliaDashboard />;
        case 'US':
          return <USDashboard />;
        case 'China':
          return <ChinaDashboard />;
        case 'Canada':
          return <CanadaDashboard />;
        default:
          return <CountryDashboard countryCode={countryCode} />;
      }
    }
  }

  return <></>;
};
