import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import iconSearch from '../../assets/search.svg';
import iconAdd from '../../assets/add.svg';
import iconNotification from '../../assets/notification.svg';
import iconUser from '../../assets/user.svg';
import logoWhite from '../../assets/jobfilez_white.png';

import './index.css';
class Header extends React.Component {
  render() {
    return (
      <div className="scroll-header">
        <Menu
          theme="dark"
          inlineCollapsed={false}
          mode="horizontal"
          defaultSelectedKeys={['9']}
          style={{ lineHeight: '55px' }}
          className="headerWrapper"
        >
          <Menu.Item key="1" style={{width: 150}}>
            <div className="logoImageWrapper">
              <img src={logoWhite} />
            </div>
          </Menu.Item>
          <Menu.Item key="2">Dashboard</Menu.Item>
          <Menu.Item key="3">Leads</Menu.Item>
          <Menu.Item key="4">Quotes</Menu.Item>
          <Menu.Item key="5">Jobs</Menu.Item>
          <Menu.Item key="6">PM's</Menu.Item>
          <Menu.Item key="7">SCHEDULE</Menu.Item>
          <Menu.Item key="8">Dispatch</Menu.Item>
          <Menu.Item key="9">
            <Link to="/">Sales</Link>
          </Menu.Item>
          <Menu.Item key="10">Expenses</Menu.Item>
          <Menu.Item key="11">Assets</Menu.Item>
          <Menu.Item key="12">HR</Menu.Item>
          <Menu.Item key="13">Resources</Menu.Item>
          <Menu.Item className="right-icons">
            <ul className="right-menu">
              <li>
                <a href="">
                  <img src={iconSearch} />
                </a>
              </li>
              <li>
                <a href="">
                  <img src={iconAdd} />
                </a>
              </li>
              <li>
                <a href="">
                  <img src={iconNotification} />
                </a>
              </li>
              <li>
                <a href="">
                  <img src={iconUser} />
                </a>
              </li>
            </ul>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Header;
