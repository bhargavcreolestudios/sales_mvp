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
		console.log(customers,'customers')
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				render: (text, record) => (
					<div className="nameWrapper">
						<div className="customTD fullNameWrapper">
							<p className="name">
								<Link to="/customer-detail">{text}</Link>
							</p>
							<p className="content">{record.fullName}</p>
						</div>
						<div className={(moreOption && key === record.key) ? `iconMoreWrapper active` : `iconMoreWrapper`} onClick={() => this.moreOption(record.key)}>
							<img src={iconMore} />
						</div>
						{(moreOption && key === record.key) && <span className="moreMenuWrapper">
							<p>Create Statements</p>
							<p>Email</p>
							<p className="lastOption">Make Inactive</p>
						</span>
						}
					</div>
				),
			},
			{
				title: 'Address',
				dataIndex: 'address',
				render: (text, record) => (
					<div className="customTD">
						<p className="content">{text}</p>
						<p className="content">{record.addressLine}</p>
					</div>
				),
			},
			{
				title: 'Type',
				dataIndex: 'type',
				render: text => <p className="content otherContent">{text}</p>
			},
			{
				title: 'Phone',
				dataIndex: 'phone',
				render: text => <p className="content otherContent">{text}</p>
			},
			{
				title: 'Fax No.',
				dataIndex: 'faxNo',
				render: text => <p className="content otherContent">{text}</p>
			}
		];
		const data = [
			{
				key: 1,
				name: 'A & G Sales',
				fullName: 'A & G Sales Fence & Supply',
				address: '11926 Woodruff Ave.',
				addressLine: 'Downey, CA 90241',
				type: '[ASSIGNED]',
				phone: '(562) 803-1888',
				faxNo: '(562) 803-1888',
			},
			{
				key: 2,
				name: 'Able Crane Service',
				fullName: 'Able Crane Service',
				address: 'P.O. Box 2806',
				addressLine: 'Santa Fe Springs, CA 90670',
				type: 'Rental Equipment',
				phone: '(562) 946-1796',
				faxNo: '(626) 454-1602',
			},
			{
				key: 3,
				name: 'AC Gates',
				fullName: 'ACFolding Gates',
				address: '1374 E. Ninth St.',
				addressLine: 'Pomona, CA 91766',
				type: 'Manufacturer',
				phone: '(866) 944-2837',
				faxNo: '(866) 796-4283',
			},
			{
				key: 4,
				name: 'Academy',
				fullName: 'Academy Doors',
				address: '555 Maitland Ave',
				addressLine: 'Ontario, CA 91761',
				type: 'Manufacturer',
				phone: '(909) 988-0517',
				faxNo: '(909) 391-7024',
			},
			{
				key: 5,
				name: 'ACME',
				fullName: 'ACME Home Elevator',
				address: '4740 E. 2nd Street, Suite 200',
				addressLine: 'Benicia, CA 94510',
				type: 'Subcontractor',
				phone: '(562) 946-1796',
				faxNo: '(626) 454-1602',
			},
			{
				key: 6,
				name: 'Able Crane Service',
				fullName: 'Able Crane Service',
				address: 'P.O. Box 2806',
				addressLine: 'Santa Fe Springs, CA 90670',
				type: 'Rental Equipment',
				phone: '(562) 946-1796',
				faxNo: '(626) 454-1602',
			},
			{
				key: 7,
				name: 'AC Gates',
				fullName: 'ACFolding Gates',
				address: '1374 E. Ninth St.',
				addressLine: 'Pomona, CA 91766',
				type: 'Manufacturer',
				phone: '(562) 946-1796',
				faxNo: '(626) 454-1602',
			},
			{
				key: 8,
				name: 'Academy',
				fullName: 'Academy Doors',
				address: '555 Maitland Ave',
				addressLine: 'Ontario, CA 91761',
				type: 'Manufacturer',
				phone: '(562) 946-1796',
				faxNo: '(626) 454-1602',
			},
			{
				key: 9,
				name: 'ACME',
				fullName: 'ACME Home Elevator',
				address: '4740 E. 2nd Street, Suite 200',
				addressLine: 'Benicia, CA 94510',
				type: 'Subcontractor',
				phone: '(562) 946-1796',
				faxNo: '(626) 454-1602',
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
			<Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
		);
	}
}
export default CustomerListSection;