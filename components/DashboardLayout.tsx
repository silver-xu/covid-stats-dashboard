import { Layout } from 'antd';

import { ReactElement } from 'react';
import { SideMenu } from './SideMenu';
import { contentStyles } from './Dashboard.styles';
import { MainBreadcrumb } from './MainBreadcrumb';
import { MainLayout } from './MainLayout';

const { Content, Sider } = Layout;

export const DashboardLayout = ({
  children,
  countryCode,
  stateCode,
}: {
  children: ReactElement;
  countryCode: string;
  stateCode?: string;
}) => (
  <MainLayout selectedKey="dashboard">
    <Content style={contentStyles}>
      <MainBreadcrumb countryCode={countryCode} stateCode={stateCode} />
      <Layout className="content">
        <Sider width={300} breakpoint="lg" collapsedWidth="0">
          <SideMenu countryCode={countryCode} stateCode={stateCode} />
        </Sider>
        <Layout>
          <Content style={contentStyles}>{children}</Content>
        </Layout>
      </Layout>
    </Content>
  </MainLayout>
);
