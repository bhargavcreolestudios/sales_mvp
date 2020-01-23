import React from 'react';
import FilterSection from '../../FilterSection';
import CustomerListSection from '../../CustomerListSection';
import './index.css';
class AllSection extends React.Component {
	render() {
		return (
			<div className="AllSectionWrapper">
				<FilterSection />
				<CustomerListSection />
			</div>
		)
	}
}

export default AllSection;