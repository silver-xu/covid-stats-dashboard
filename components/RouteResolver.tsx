import React from 'react';
import { WorldDashboard } from './World/WorldDashboard';
import { AustraliaDashboard } from './Australia/AustraliaDashboard';
import { USDashboard } from './US/USDashboard';
import { ChinaDashboard } from './China/ChinaDashboard';
import { CanadaDashboard } from './Canada/CanadaDashboard';
import { CountryDashboard } from './CountryDashboard';
import { StateDashboard } from './State/StateDashboard';

export const RouteResolver = ({ countryCode, stateCode }: { countryCode: string; stateCode: string }) => {
  if (stateCode) {
    return <StateDashboard countryCode={countryCode} stateCode={stateCode} />;
  }
  switch (countryCode) {
    case 'Global':
      return <WorldDashboard />;
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

  return <></>;
};
