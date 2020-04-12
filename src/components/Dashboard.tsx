import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import { contentStyles } from './Dashboard.styles';
import { SideMenu } from './SideMenu';
import { RouteResolver } from './RouteResolver';
import { MainBreadcrumb } from './MainBreadcrumb';

const { Content, Sider } = Layout;
export const Dashboard = () => {
  return (
    <Content style={contentStyles}>
      <MainBreadcrumb />
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
