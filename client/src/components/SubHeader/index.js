import React from 'react';
import { Tabs } from 'antd';
import './index.css';

const { TabPane } = Tabs;
class SubHeader extends React.Component {
  render() {
  	const { defaultActiveKey, tabPane } = this.props;
  	return (
	  <div className="SubHeaderWrapper">
	  	<Tabs className="SubHeaderTabs" defaultActiveKey={defaultActiveKey}>
		    {tabPane.map((tabpane, index) => (
		    	<TabPane tab={tabpane.tab} key={index}>
		    		{tabpane.component}
		    	</TabPane>
		    ))}
		</Tabs>
	  </div>
  	);
  }
}

export default SubHeader;
