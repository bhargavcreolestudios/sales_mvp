import React from 'react';
import { Typography, Tabs } from 'antd';
import './index.css';
import newCustomer from '../../assets/newCustomer.png';
import customerTypes from '../../assets/customerTypes.png';
import columnOptions from '../../assets/columnOptions.png';
import importCustomers from '../../assets/importCustomers.png';
import recycle from '../../assets/recycle.png';

import AllSection from '../TabSection/AllSection';

const { Title } = Typography;
const { TabPane } = Tabs;
class SubHeader extends React.Component {
  render() {
  	return (
	  <div className="SubHeaderWrapper">
	  	<Title level={3}>Customers</Title>
	  	<Tabs className="SubHeaderTabs" defaultActiveKey="1">
		    <TabPane tab="All" key="1">
		      <AllSection />
		    </TabPane>
		    <TabPane tab="New" key="2">
		      Tab 2
		    </TabPane>
		    <TabPane tab="Inactive" key="3">
		      Tab 3
		    </TabPane>
		    <TabPane
		      tab={
		        <span>
		          <img src={newCustomer} />
		          New Customer
		        </span>
		      } 
		      key="3">
		      Tab 3
		    </TabPane>
		    <TabPane
		      tab={
		        <span>
		          <img src={customerTypes} />
		          Customer Types
		        </span>
		      } 
		      key="3">
		      Tab 3
		    </TabPane>
		    <TabPane
		      tab={
		        <span>
		          <img src={columnOptions} />
		          Column Options
		        </span>
		      } 
		      key="3">
		      Tab 3
		    </TabPane>
		    <TabPane
		      tab={
		        <span>
		          <img src={importCustomers} />
		          Import Customers
		        </span>
		      } 
		      key="3">
		      Tab 3
		    </TabPane>
		    <TabPane
		      tab={
		        <span>
		          <img src={recycle} />
		          Recycle
		        </span>
		      } 
		      key="3">
		      Tab 3
		    </TabPane>
		</Tabs>
	  </div>
  	);
  }
}

export default SubHeader;
