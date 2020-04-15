import Link from 'next/link';
import { Breadcrumb } from 'antd';
import React from 'react';

import { breadCrumbStyles } from './MainBreadcrumbe.styles';
import { getStateByCode, getCountryByCode } from '../services/countryServices';

const { Item } = Breadcrumb;

export const MainBreadcrumb = ({ countryCode, stateCode }: { countryCode: string; stateCode?: string }) => (
  <Breadcrumb style={breadCrumbStyles}>
    <Item>COVID19 Dashboard</Item>
    <Item>
      <Link href="/[countryCode]" as={`/${countryCode}`}>
        {countryCode === 'Global' ? 'World' : getCountryByCode(countryCode)?.name}
      </Link>
    </Item>
    {countryCode && stateCode && (
      <Item>
        <Link href="/[countryCode]/[stateCode" as={`/${countryCode}/${stateCode}`}>
          {getStateByCode(countryCode, stateCode)?.name}
        </Link>
      </Item>
    )}
  </Breadcrumb>
);
