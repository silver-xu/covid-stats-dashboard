import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Route, Switch } from 'react-router-dom';

import { contentStyles, breadCrumbStyles } from './Dashboard.styles';
import { SideMenu } from './SideMenu';
import { default as countries } from '../config/countries.json';
import { RouteResolver } from './RouteResolver';
import { usePath } from '../utils/usePath';

const { Content, Sider } = Layout;
const { Item } = Breadcrumb;

export const Dashboard = () => {
  const { countryCode, stateCode } = usePath();

  return (
    <Content style={contentStyles}>
      <Breadcrumb style={breadCrumbStyles}>
        <Item>COVID19 Dashboard</Item>
        <Item>{!countryCode ? 'World' : (countries as any)[countryCode].name}</Item>
        {countryCode && stateCode && <Item>{(countries as any)[countryCode].states[stateCode].name}</Item>}
      </Breadcrumb>
      <Layout className="content">
        <Sider width={300} breakpoint="lg" collapsedWidth="0">
          <SideMenu />
        </Sider>
        <Layout>
          <Content style={contentStyles}>
            <Switch>
              <Route path="/" component={RouteResolver} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Content>
  );
};
