import React from 'react';
import { Layout, Typography } from 'antd';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import './index.css'
import AllSection from '../../components/TabSection/AllSection';

import newCustomer from '../../assets/newCustomer.png';
import customerTypes from '../../assets/customerTypes.png';
import columnOptions from '../../assets/columnOptions.png';
import importCustomers from '../../assets/importCustomers.png';
import recycle from '../../assets/recycle.png';

const { Title } = Typography;
const tabs = [
	{
		tab: 'All',
		component: <AllSection />
	}, {
		tab: 'New',
		component: <div>hi</div>
	}, {
		tab: 'Inactive',
		component: <div>hi</div>
	}, {
		tab: (
			<span>
				<img src={newCustomer} />New Customer
	  	</span>
		),
		component: <div>hi</div>
	}, {
		tab: (
			<span>
				<img src={customerTypes} />Customer Types
		</span>
		),
		component: <div>hi</div>
	}, {
		tab: (
			<span>
				<img src={columnOptions} />Column Options
		</span>
		),
		component: <div>hi</div>
	}, {
		tab: (
			<span>
				<img src={importCustomers} />Import Customers
	    </span>
		),
		component: <div>hi</div>
	}, {
		tab: (
			<span>
				<img src={recycle} />Recycle
        </span>
		),
		component: <div>hi</div>
	},
]
class Home extends React.Component {
	render() {
		return (
			<Layout>
				<Header />
				<Title level={3} className="pageTitle">Customers</Title>
				<SubHeader defaultActiveKey="0" tabPane={tabs} />
			</Layout>
		);
	}
}

export default Home;
