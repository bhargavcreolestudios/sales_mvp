import React from 'react';
import { Link } from 'react-router-dom';
import iconBackarrow from '../../assets/iconBackarrow.png';
import './index.css';
class BackOption extends React.Component {
	render() {
		return (
			<div className="backWrapper">
				<Link to={this.props.redirectBack}><img src={iconBackarrow} /><p>Customers</p></Link>
			</div>
		);
	}
}
export default BackOption;