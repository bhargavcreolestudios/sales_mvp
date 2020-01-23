import React from 'react';
import { Layout } from 'antd';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import BackOption from '../../components/BackOption';
import CustomerDetailSection from '../../components/CustomerDetailSection';
import Contacts from '../../components/Contacts';
import './index.css';
const tabs = [
	{
		tab: 'Overview',
		component: <div>hi</div>
	}, {
		tab: 'Activity',
		component: <div>hi</div>
	}, {
		tab: 'Documents',
		component: <div>hi</div>
	}, {
		tab: 'Properties',
		component: <div>hi</div>
	}, {
		tab: 'Equipment',
		component: <div>hi</div>
	}, {
		tab: 'Contacts',
		component: <Contacts />
	},
]

class CustomerDetail extends React.Component {
	render() {
		return (
			<Layout>
				<Header />
				<BackOption redirectBack="/" />
				<CustomerDetailSection />
				<SubHeader defaultActiveKey="5" tabPane={tabs} />
			</Layout>
		);
	}
}
export default CustomerDetail;