import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import React from 'react';

import { breadCrumbStyles } from './MainBreadcrumbe.styles';
import { getStateByCode, getCountryByCode } from '../services/countryServices';
import { usePath } from '../utils/usePath';

const { Item } = Breadcrumb;

export const MainBreadcrumb = () => {
  const { countryCode, stateCode } = usePath();

  return (
    <Breadcrumb style={breadCrumbStyles}>
      <Item>COVID19 Dashboard</Item>
      <Item>
        <Link to={`/${countryCode || ''}`}>{!countryCode ? 'World' : getCountryByCode(countryCode)?.name}</Link>
      </Item>
      {countryCode && stateCode && (
        <Item>
          <Link to={`/${countryCode}/${stateCode}`}>{getStateByCode(countryCode, stateCode)?.name}</Link>
        </Item>
      )}
    </Breadcrumb>
  );
};
