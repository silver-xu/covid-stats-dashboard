import React, { useContext } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, GlobalOutlined, MonitorOutlined, BarChartOutlined } from '@ant-design/icons';
import { SelectParam } from 'antd/lib/menu';

import { menuStyles } from './Dashboard.styles';
import { MenuContext } from '../contexts/menuContext';
import { default as countries } from '../config/countries.json';

const { SubMenu, Item } = Menu;

export const SideMenu = () => {
  const menu = useContext(MenuContext);

  const menuSelected = (params: SelectParam) => {
    const [token1, token2] = params.key.split('.');
    const key = token2 || token1;
    const parent = token2 ? token1 : undefined;
    const item = {
      key,
      parent,
    };

    menu.selectItem(item);
  };

  const selectedKeys = menu.item.key;
  const openKeys = `${menu.item.parent || menu.item.key}Menu`;

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[selectedKeys]}
      defaultOpenKeys={[openKeys]}
      style={menuStyles}
      onSelect={menuSelected}
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
          Overview
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
            Overview
          </Item>

          {Object.entries(countries.Australia.states).map(([stateCode, state]) => (
            <Item key={`Australia.${stateCode}`}>
              <BarChartOutlined />
              {state.name}
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
            Overview
          </Item>

          {Object.entries(countries.US.states).map(([stateCode, state]) => (
            <Item key={`US.${stateCode}`}>
              <BarChartOutlined />
              {state.name}
            </Item>
          ))}
        </SubMenu>
        <SubMenu
          key="ChinaMenu"
          title={
            <span>
              <HomeOutlined />
              China
            </span>
          }
        >
          <Item key="China">
            <MonitorOutlined />
            Overview
          </Item>

          {Object.entries(countries.China.states).map(([stateCode, state]) => (
            <Item key={`China.${stateCode}`}>
              <BarChartOutlined />
              {state.name}
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
            Overview
          </Item>

          {Object.entries(countries.Canada.states).map(([stateCode, state]) => (
            <Item key={`Canada.${stateCode}`}>
              <BarChartOutlined />
              {state.name}
            </Item>
          ))}
        </SubMenu>
        <Item key="UK">
          <BarChartOutlined />
          United Kingdom
        </Item>
        <Item key="Italy">
          <BarChartOutlined />
          Italy
        </Item>
        <Item key="Spain">
          <BarChartOutlined />
          Spain
        </Item>
        <Item key="France">
          <BarChartOutlined />
          France
        </Item>
        <Item key="Japan">
          <BarChartOutlined />
          Japan
        </Item>
        <Item key="KoreaSouth">
          <BarChartOutlined />
          South Korea
        </Item>
        <Item key="India">
          <BarChartOutlined />
          India
        </Item>
        <Item key="Iran">
          <BarChartOutlined />
          Iran
        </Item>
      </SubMenu>
    </Menu>
  );
};
