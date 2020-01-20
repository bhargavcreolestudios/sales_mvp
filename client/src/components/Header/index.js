import React from 'react';
import { Menu } from 'antd';
import './index.css';
class Header extends React.Component {
  render() {
  	return (
	  <div>
	  	<Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['9']}
          style={{ lineHeight: '64px' }}
          className="headerWrapper"
	    >
	    	<Menu.Item key="1"></Menu.Item>
	        <Menu.Item key="2">Dashboard</Menu.Item>
	        <Menu.Item key="3">Leads</Menu.Item>
	        <Menu.Item key="4">Quotes</Menu.Item>
	        <Menu.Item key="5">Jobs</Menu.Item>
	        <Menu.Item key="6">PM's</Menu.Item>
	        <Menu.Item key="7">SCHEDULE</Menu.Item>
	        <Menu.Item key="8">Dispatch</Menu.Item>
	        <Menu.Item key="9">Sales</Menu.Item>
	        <Menu.Item key="10">Expenses</Menu.Item>
	        <Menu.Item key="11">Assets</Menu.Item>
	        <Menu.Item key="12"></Menu.Item>
	        <Menu.Item key="13">Resources</Menu.Item>
	    </Menu>
	  </div>
  	);
  }
}

export default Header;
