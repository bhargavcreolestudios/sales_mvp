import React from 'react';
import { Layout } from 'antd';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';

class Home extends React.Component {
  render() {
  	return (
	    <Layout>
	      <Header />
	      <SubHeader />
	    </Layout>
  	);
  }
}

export default Home;
