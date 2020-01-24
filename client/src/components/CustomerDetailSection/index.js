import React from 'react';
import { Row, Col, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import iconEdit from '../../assets/iconEdit.png';
import customerImage from '../../assets/customerImage.png';
import './index.css';

class CustomerDetailSection extends React.Component {
	render() {
		return (
			<div className="customer-detail-section">
				<Row>
				<Col span={16}>
					<div className="titleWrapper">
						<h1 className="customerName">A & G Sales</h1>
						<img src={iconEdit} />
					</div>
					<div>
						<div className="titleDetailSection">
							<p>A & G Fence & Supply</p>
							<span></span>
							<p>Manufacturer</p>
						</div>
					</div>
					<div>
						<div className="customerDetail">
							<img src={customerImage} />
							<div className="details">
								<div>Phone: <Link to="/">+1 (562) 803-1888</Link></div>
								<div>Address: <Link to="/">11926 Woodruff Ave. Downey, CA 90241</Link></div>
								<div>E-mail: <Link to="/">info@agsales.com</Link></div>
							</div>
						</div>
					</div>
				</Col>
      			<Col span={8}>
      				<div className="statisticsWrapper">
      					<Button type="primary">
						  New Transaction | <Icon type="down" />
						</Button>
						<div>
							<div className="statisticsSection">
								<div className="firstStatistic">
									<div className="openWrapper">
										<div className="statisticsColor"></div>
										<span className="price">$12,450.00</span>
									</div>
									<div>
										<p className="status">OPEN</p>
									</div>
								</div>
								<div className="secondStatistic">
									<div className="openWrapper">
										<div className="statisticsColor statisticsColorOver"></div>
										<span className="price">$12,450.00</span>
									</div>
									<div>
										<p className="status">OVERDUE</p>
									</div>
								</div>
							</div>
						</div>
      				</div>
      			</Col>
				</Row>
			</div>
		);
	}
}
export default CustomerDetailSection;