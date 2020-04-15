import React, { ReactElement } from 'react';
import { Layout, Menu } from 'antd';

import Link from 'next/link';

export type MenuKeys = 'dashboard' | 'doc';

export const MainLayout = ({ children, selectedKey }: { children: ReactElement; selectedKey: MenuKeys }) => (
  <Layout>
    <Layout.Header className="header">
      <div className="logo">
        <img src="/logo.png" alt="COVID19" />
      </div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
        <Menu.Item key="dashboard">
          <Link href="/">
            <a>COVID19 Dashboard</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="prevention">
          <a href="https://www.healthdirect.gov.au/coronavirus-covid-19-how-to-avoid-infection-faqs">
            Prevent Spreading
          </a>
        </Menu.Item>
        <Menu.Item key="doc">
          <Link href="/doc">
            <a>GraphQL API</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
    {children}
    <Layout.Footer style={{ textAlign: 'center' }}>
      Silver Xu ©2020 Created with the COVIDStats GraphQL API. Statistics extracted from the John Hopkins Medical
      School.
    </Layout.Footer>
  </Layout>
);
