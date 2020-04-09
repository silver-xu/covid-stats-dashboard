import React, { useContext } from 'react';
import { Layout, Breadcrumb } from 'antd';

import { WorldDashboard } from './World/WorldDashboard';
import { AustraliaDashboard } from './Australia/AustraliaDashboard';
import { contentStyles, breadCrumbStyles } from './Dashboard.styles';
import { SideMenu } from './SideMenu';
import { MenuContext } from '../contexts/menuContext';
import { StateDashboard } from './State/StateDashboard';
import { default as countries } from '../config/countries.json';
import { CountryDashboard } from './CountryDashboard';
import { USDashboard } from './US/USDashboard';
import { CanadaDashboard } from './Canada/CanadaDashboard';
import { ChinaDashboard } from './China/ChinaDashboard';

const { Content, Sider } = Layout;
const { Item } = Breadcrumb;

export const Dashboard = () => {
  const menu = useContext(MenuContext);
  const { parent, key } = menu.item;

  const getCountryName = (key: string) => (key === 'Global' ? 'World' : (countries as any)[key].name);
  const getStateName = (key: string, parent: string) => (countries as any)[parent].states[key].name;

  const child = parent ? getStateName(key, parent) : getCountryName(key);

  const isGenericCountry = (key: string, parent?: string) =>
    !parent && !['Global', 'Australia', 'US', 'Canada', 'China'].find((countryCode) => key === countryCode);

  return (
    <Content style={contentStyles}>
      <Breadcrumb style={breadCrumbStyles}>
        <Item>COVID19 Dashboard</Item>
        {parent && <Item>{parent}</Item>}
        <Item>{child}</Item>
      </Breadcrumb>
      <Layout className="content">
        <Sider width={300} breakpoint="lg" collapsedWidth="0">
          <SideMenu />
        </Sider>
        <Layout>
          <Content style={contentStyles}>
            {menu.item.key === 'Global' && <WorldDashboard />}
            {menu.item.key === 'Australia' && <AustraliaDashboard />}
            {menu.item.key === 'US' && <USDashboard />}
            {menu.item.key === 'China' && <ChinaDashboard />}
            {menu.item.key === 'Canada' && <CanadaDashboard />}

            {isGenericCountry(key, parent) && <CountryDashboard countryCode={key} />}
            {menu.item.parent && <StateDashboard countryCode={menu.item.parent} stateCode={menu.item.key} />}
          </Content>
        </Layout>
      </Layout>
    </Content>
  );
};
