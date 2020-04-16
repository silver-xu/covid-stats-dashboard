import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, GlobalOutlined, MonitorOutlined, BarChartOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { Search } from './Search';
import { getCountries, getCountryByCode } from '../services/countryServices';

const { SubMenu, Item } = Menu;
const globalMenu = 'GlobalMenu';

export const SideMenu = ({ countryCode, stateCode }: { countryCode: string; stateCode?: string }) => {
  const [openedMenu, setOpenedMenu] = useState<string[]>([globalMenu]);

  useEffect(() => {
    setOpenedMenu([globalMenu, `${countryCode}Menu`]);
  }, [countryCode, stateCode]);

  const handleOpenChange = (openKeys: string[]) => {
    setOpenedMenu(openKeys);
  };

  return (
    <>
      <Search />
      <Menu
        mode="inline"
        openKeys={openedMenu}
        selectedKeys={[stateCode ? `${countryCode}.${stateCode}` : countryCode]}
        onOpenChange={handleOpenChange}
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
            <Link href="/">Overview</Link>
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
              <Link href="/Dashboard/[countryCode]" as="/Dashboard/Australia">
                <a>Overview</a>
              </Link>
            </Item>

            {Object.entries(getCountryByCode('Australia').states).map(([stateCode, state]) => (
              <Item key={`Australia.${stateCode}`}>
                <BarChartOutlined />
                <Link href="/Dashboard/[countryCode]/[stateCode]" as={`/Dashboard/Australia/${stateCode}`}>
                  <a>{state.name}</a>
                </Link>
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
              <Link href="/Dashboard/[countryCode]" as="/Dashboard/US">
                Overview
              </Link>
            </Item>

            {Object.entries(getCountryByCode('US').states).map(([stateCode, state]) => (
              <Item key={`US.${stateCode}`}>
                <BarChartOutlined />
                <Link href="/Dashboard/[countryCode]/[stateCode]" as={`/Dashboard/US/${stateCode}`}>
                  <a>{state.name}</a>
                </Link>
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
              <Link href="/Dashboard/[countryCode]" as="/Dashboard/China">
                Overview
              </Link>
            </Item>

            {Object.entries(getCountryByCode('China').states).map(([stateCode, state]) => (
              <Item key={`China.${stateCode}`}>
                <BarChartOutlined />
                <Link href="/Dashboard/[countryCode]/[stateCode]" as={`/Dashboard/China/${stateCode}`}>
                  <a>{state.name}</a>
                </Link>
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
              <Link href="/Dashboard/[countryCode]" as="/Dashboard/Canada">
                Canada
              </Link>
            </Item>

            {Object.entries(getCountryByCode('Canada').states).map(([stateCode, state]) => (
              <Item key={`Canada.${stateCode}`}>
                <BarChartOutlined />
                <Link href="/Dashboard/[countryCode]" as={`/Dashboard/Canada/${stateCode}`}>
                  <a>{state.name}</a>
                </Link>
              </Item>
            ))}
          </SubMenu>
          <Item key="UK">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/UK">
              <a>United Kingdom</a>
            </Link>
          </Item>
          <Item key="Italy">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/Italy">
              <a>Italy</a>
            </Link>
          </Item>
          <Item key="Spain">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/Spain">
              <a>Spain</a>
            </Link>
          </Item>
          <Item key="France">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/France">
              <a>France</a>
            </Link>
          </Item>
          <Item key="Japan">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/Japan">
              <a>Japan</a>
            </Link>
          </Item>
          <Item key="KoreaSouth">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/KoreaSouth">
              <a>South Korea</a>
            </Link>
          </Item>
          <Item key="India">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/India">
              <a>India</a>
            </Link>
          </Item>
          <Item key="Iran">
            <BarChartOutlined />
            <Link href="/Dashboard/[countryCode]" as="/Dashboard/Iran">
              <a>Iran</a>
            </Link>
          </Item>
        </SubMenu>
      </Menu>
    </>
  );
};
