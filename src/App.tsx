import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu } from 'antd';

import { Dashboard } from './components/Dashboard';
import logo from './logo.png';
import { MenuProvider } from './contexts/menuContext';

const App = () => (
  <MenuProvider>
    <Layout>
      <Layout.Header className="header">
        <div className="logo">
          <img src={logo} alt="COVID19" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">COVID19 Dashboard</Menu.Item>
          <Menu.Item key="2">Prevent Spreading</Menu.Item>
          <Menu.Item key="3">Open Source API</Menu.Item>
        </Menu>
      </Layout.Header>
      <Dashboard />
      <Layout.Footer style={{ textAlign: 'center' }}>
        Silver Xu ©2020 Created with the COVIDStats GraphQL API. Statistics extracted from the John Hopkins Medical
        School.
      </Layout.Footer>
    </Layout>
  </MenuProvider>
);

export default App;
