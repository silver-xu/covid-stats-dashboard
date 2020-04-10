import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, GlobalOutlined, MonitorOutlined, BarChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { menuStyles } from './Dashboard.styles';
import { default as countries } from '../config/countries.json';
import { usePath } from '../utils/usePath';
import { Search } from './Search';

const { SubMenu, Item } = Menu;

export const SideMenu = () => {
  const { countryCode, stateCode } = usePath();
  const country = countryCode || 'Global';

  return (
    <>
      <Search />
      <Menu
        mode="inline"
        openKeys={['GlobalMenu', `${country}Menu`]}
        selectedKeys={[stateCode ? `${country}.${stateCode}` : country]}
        style={menuStyles}
      >
        <SubMenu
          key="GlobalMenu"
          title={
            <span>
              <GlobalOutlined />
              World
            </span>
          }
        >
          <Item key="Global">
            <MonitorOutlined />
            <Link to="/">Overview</Link>
          </Item>
          <SubMenu
            key="AustraliaMenu"
            title={
              <span>
                <HomeOutlined />
                Australia
              </span>
            }
          >
            <Item key="Australia">
              <MonitorOutlined />
              <Link to="/Australia">Overview</Link>
            </Item>

            {Object.entries(countries.Australia.states).map(([stateCode, state]) => (
              <Item key={`Australia.${stateCode}`}>
                <BarChartOutlined />
                <Link to={`/Australia/${stateCode}`}>{state.name}</Link>
              </Item>
            ))}
          </SubMenu>
          <SubMenu
            key="USMenu"
            title={
              <span>
                <HomeOutlined />
                United States
              </span>
            }
          >
            <Item key="US">
              <MonitorOutlined />
              <Link to="/US">Overview</Link>
            </Item>

            {Object.entries(countries.US.states).map(([stateCode, state]) => (
              <Item key={`US.${stateCode}`}>
                <BarChartOutlined />
                <Link to={`/US/${stateCode}`}>{state.name}</Link>
              </Item>
            ))}
          </SubMenu>
          <SubMenu
            key="ChinaMenu"
            title={
              <span>
                <HomeOutlined />
                <Link to="/US">China</Link>
              </span>
            }
          >
            <Item key="China">
              <MonitorOutlined />
              <Link to="/China">Overview</Link>
            </Item>

            {Object.entries(countries.China.states).map(([stateCode, state]) => (
              <Item key={`China.${stateCode}`}>
                <BarChartOutlined />
                <Link to={`/China/${stateCode}`}>{state.name}</Link>
              </Item>
            ))}
          </SubMenu>
          <SubMenu
            key="CanadaMenu"
            title={
              <span>
                <HomeOutlined />
                Canada
              </span>
            }
          >
            <Item key="Canada">
              <MonitorOutlined />
              <Link to="/Canada">Canada</Link>
            </Item>

            {Object.entries(countries.Canada.states).map(([stateCode, state]) => (
              <Item key={`Canada.${stateCode}`}>
                <BarChartOutlined />
                <Link to={`/Canada/${stateCode}`}>{state.name}</Link>
              </Item>
            ))}
          </SubMenu>
          <Item key="UK">
            <BarChartOutlined />
            <Link to="/UK">United Kingdom</Link>
          </Item>
          <Item key="Italy">
            <BarChartOutlined />
            <Link to="/Italy">Italy</Link>
          </Item>
          <Item key="Spain">
            <BarChartOutlined />
            <Link to="/Spain">Spain</Link>
          </Item>
          <Item key="France">
            <BarChartOutlined />
            <Link to="/France">France</Link>
          </Item>
          <Item key="Japan">
            <BarChartOutlined />
            <Link to="/Japan">Japan</Link>
          </Item>
          <Item key="KoreaSouth">
            <BarChartOutlined />
            <Link to="/KoreaSouth">South Korea</Link>
          </Item>
          <Item key="India">
            <BarChartOutlined />
            <Link to="/India">India</Link>
          </Item>
          <Item key="Iran">
            <BarChartOutlined />
            <Link to="/Iran">Iran</Link>
          </Item>
        </SubMenu>
      </Menu>
    </>
  );
};
