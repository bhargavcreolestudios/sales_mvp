import React from 'react';
import { Row, Col, Select } from 'antd';
import iconFilter from '../../assets/iconFilter.png';
import './index.css';
const { Option } = Select;
class FilterSection extends React.Component {
	render() {
		return (
			<div className="filterSection">
				<Row>
					<Col span={6}>
						<div className="filterIcon">
							<img src={iconFilter} />
							<p>Filter by Keyword</p>
						</div>
					</Col>
					<Col span={18}>
						<div className="filterOptions">
							<div>
								<label style={{ color: '#707070' }}>Location:</label>
								<Select
									style={{ width: 170 }}
									placeholder="Select location"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option value="Miner Los Angeles">Miner Los Angeles</Option>
									<Option value="lucy">Lucy</Option>
									<Option value="tom">Tom</Option>
								</Select>
							</div>
							<div>
								<Select
									style={{ width: 100 }}
									placeholder="Division"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option value="Division">Division</Option>
									<Option value="lucy">Lucy</Option>
									<Option value="tom">Tom</Option>
								</Select>
							</div>
							<div>
								<Select
									style={{ width: 125 }}
									placeholder="Account Req"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option value="Account Request">Account Request</Option>
									<Option value="lucy">Lucy</Option>
									<Option value="tom">Tom</Option>
								</Select>
							</div>
							<div>
								<Select
									style={{ width: 75 }}
									placeholder="Type"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option value="Type">Type</Option>
									<Option value="lucy">Lucy</Option>
									<Option value="tom">Tom</Option>
								</Select>
							</div>
							<div>
								<Select
									style={{ width: 90 }}
									placeholder="Status"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option value="Status">Status</Option>
									<Option value="lucy">Lucy</Option>
									<Option value="tom">Tom</Option>
								</Select>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
export default FilterSection