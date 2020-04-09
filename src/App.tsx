import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import logo from './logo.png';
import { Dashboard } from './components/Dashboard';
import { MenuProvider } from './contexts/menuContext';
import { Doc } from './components/Doc';

const App = () => (
  <MenuProvider>
    <Router>
      <Layout>
        <Layout.Header className="header">
          <div className="logo">
            <img src={logo} alt="COVID19" />
          </div>

          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']}>
            <Menu.Item key="dashboard">
              <Link to="/">COVID19 Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="prevention">
              <a href="https://www.healthdirect.gov.au/coronavirus-covid-19-how-to-avoid-infection-faqs">
                Prevent Spreading
              </a>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/api">GraphQL API</Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Switch>
          <Route path="/api">
            <Doc />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>

        <Layout.Footer style={{ textAlign: 'center' }}>
          Silver Xu ©2020 Created with the COVIDStats GraphQL API. Statistics extracted from the John Hopkins Medical
          School.
        </Layout.Footer>
      </Layout>
    </Router>
  </MenuProvider>
);

export default App;
