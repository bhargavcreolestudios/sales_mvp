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
    component: <div><h2>Overview</h2></div>
  },
  {
    tab: 'Activity',
    component: <div><h2>Activity</h2></div>
  },
  {
    tab: 'Documents',
    component: <div><h2>Documents</h2></div>
  },
  {
    tab: 'Properties',
    component: <div><h2>Properties</h2></div>
  },
  {
    tab: 'Equipment',
    component: <div><h2>Equipment</h2></div>
  },
  {
    tab: 'Contacts',
    component: <Contacts />
  }
];

class CustomerDetail extends React.Component {
  render() {
    return (
      <Layout>
        <Header />
        <BackOption redirectBack="/" />
        <CustomerDetailSection />
        <SubHeader defaultActiveKey="0" tabPane={tabs} className="detailsTab" />
      </Layout>
    );
  }
}
export default CustomerDetail;
