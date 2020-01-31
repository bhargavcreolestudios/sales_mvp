import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import iconMore from '../../assets/iconMore.png';
import './index.css';

// SERVICES
import customerService from '../../services/customerService';

class CustomerListSection extends React.Component {
	state = {
		key: 0,
		moreOption: false,
		customers: [],
	};
	moreOption = (key) => {
		this.setState({ moreOption: true, key: key });
	}
	async componentDidMount(){
	    const { customers } = this.state
	    let allCustomers = await customerService.getAll();
	    this.setState({ customers: allCustomers })
  	}
	render() {
		const { moreOption, key, customers } = this.state;
		const columns = [
			{
				title: 'Name',
				dataIndex: 'firstName',
				render: (text, record) => (
					<div className="nameWrapper">
						<div className="customTD fullNameWrapper">
							<p className="name">
								<Link to="/customer-detail">{text}</Link>
							</p>
							<p className="content">{record.displayName}</p>
						</div>
						<div className={(moreOption && key === record.key) ? `iconMoreWrapper active` : `iconMoreWrapper`}>
							<img src={iconMore} />
						</div>
					</div>
				),
			},
			{
				title: 'Address',
				dataIndex: 'billingAddress',
				render: (text, record) => (
					<div className="customTD">
						<p className="content">{text}</p>
						<p className="content">{record.city} {record.state}</p>
					</div>
				),
			},
			{
				title: 'Type',
				dataIndex: 'customerType',
				render: text => <p className="content otherContent">{text}</p>
			},
			{
				title: 'Phone',
				dataIndex: 'phone',
				render: text => <p className="content otherContent">{text}</p>
			},
			{
				title: 'Fax No.',
				dataIndex: 'fax',
				render: text => <p className="content otherContent">{text}</p>
			}
		];
		const data = [
			{
				key: 1,
				firstName: 'A & G Sales',
				displayName: 'A & G Sales Fence & Supply',
				billingAddress: '11926 Woodruff Ave.',
				city: 'Downey, ',
				state: 'CA 90241',
				customerType: '[ASSIGNED]',
				phone: '(562) 803-1888',
				fax: '(562) 803-1888',
			},
			{
				key: 2,
				firstName: 'Able Crane Service',
				displayName: 'Able Crane Service',
				billingAddress: 'P.O. Box 2806',
				city: 'Santa Fe Springs,',
				state:' CA 90670',
				customerType: 'Rental Equipment',
				phone: '(562) 946-1796',
				fax: '(626) 454-1602',
			},
			{
				key: 3,
				firstName: 'AC Gates',
				displayName: 'ACFolding Gates',
				billingAddress: '1374 E. Ninth St.',
				city: 'Pomona, ',
				state: 'CA 91766',
				customerType: 'Manufacturer',
				phone: '(866) 944-2837',
				fax: '(866) 796-4283',
			},
			{
				key: 4,
				firstName: 'Academy',
				displayName: 'Academy Doors',
				billingAddress: '555 Maitland Ave',
				city: 'Ontario, ',
				state: 'CA 91761',
				customerType: 'Manufacturer',
				phone: '(909) 988-0517',
				fax: '(909) 391-7024',
			},
			{
				key: 5,
				firstName: 'ACME',
				displayName: 'ACME Home Elevator',
				billingAddress: '4740 E. 2nd Street, Suite 200',
				city: 'Benicia, ',
				state: 'CA 94510',
				customerType: 'Subcontractor',
				phone: '(562) 946-1796',
				fax: '(626) 454-1602',
			},
			{
				key: 6,
				firstName: 'Able Crane Service',
				displayName: 'Able Crane Service',
				billingAddress: 'P.O. Box 2806',
				city: 'Santa Fe Springs, ',
				state: 'CA 90670',
				customerType: 'Rental Equipment',
				phone: '(562) 946-1796',
				fax: '(626) 454-1602',
			},
			{
				key: 7,
				firstName: 'AC Gates',
				displayName: 'ACFolding Gates',
				billingAddress: '1374 E. Ninth St.',
				city: 'Pomona, ',
				state: 'CA 91766',
				customerType: 'Manufacturer',
				phone: '(562) 946-1796',
				fax: '(626) 454-1602',
			},
			{
				key: 8,
				firstName: 'Academy',
				displayName: 'Academy Doors',
				billingAddress: '555 Maitland Ave',
				city: 'Ontario, ',
				state: 'CA 91761',
				customerType: 'Manufacturer',
				phone: '(562) 946-1796',
				fax: '(626) 454-1602',
			},
			{
				key: 9,
				firstName: 'ACME',
				displayName: 'ACME Home Elevator',
				billingAddress: '4740 E. 2nd Street, Suite 200',
				city: 'Benicia, ',
				state: 'CA 94510',
				customerType: 'Subcontractor',
				phone: '(562) 946-1796',
				fax: '(626) 454-1602',
			},

		];
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			},
			/*getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			}),*/
		};
		return (
			<Table rowSelection={rowSelection} columns={columns} dataSource={customers} pagination={false} />
		);
	}
}
export default CustomerListSection;