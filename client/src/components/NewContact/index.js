import React from 'react';
import { Form, Radio, Input, Row, Col, Select, Tabs, Checkbox, Divider, Button, Icon } from 'antd';

import './index.css';

const { Option } = Select;
const { TabPane } = Tabs;

const NewContact = Form.create({ name: 'form_in_modal' })(
//class NewContact extends React.Component{
  class extends React.Component {
  	state = { 
  		isSameAdd: false
  	}
	render(){
		const { isSameAdd } = this.state
		const { visible, onCancel, onCreate, form } = this.props;
  		const { getFieldDecorator } = form;
		return (
      		<Form onSubmit={onCreate} layout="vertical">
	            <Row>
	              <Col className="col1" span={24}>
		            <Row>
		              <Col className="spaceBetween1" span={12}>
		              	<Form.Item label="First Name">
		              	  {getFieldDecorator('firstName', {
			                rules: [{ required: true, message: 'Please enter first name!' }],
			              })(<Input />)}
			            </Form.Item>
		              </Col>
		              <Col className="spaceBetween2" span={12}>
		                <Form.Item label="Last Name">
		              	  {getFieldDecorator('lastName')(<Input />)}
			            </Form.Item>
		              </Col>
		            </Row>
		            <Form.Item label="Title/Position">
		              {getFieldDecorator('titlePosition')(<Input />)}
		            </Form.Item>
		            <Form.Item label="Email">
		              {getFieldDecorator('email')(<Input />)}
		            </Form.Item>
		            <Row>
		            	<Col span={8}>
		            		<Form.Item className="spaceBetween1" label="Mobile">
				              {getFieldDecorator('mobile')(<Input />)}
				            </Form.Item>
		            	</Col>
		            	<Col span={8}>
		            		<Form.Item className="spaceBetween2" label="Office No.">
				              {getFieldDecorator('officeNo')(<Input />)}
				            </Form.Item>
		            	</Col>
		            	<Col span={8}>
		            		<Form.Item className="spaceBetween3" label="Extension">
				              {getFieldDecorator('extension')(<Input />)}
				            </Form.Item>
		            	</Col>
		            </Row>

		          </Col>
		          <Col className="col1" span={24}>
					<Divider className="divider" type="horizontal" />
					<div className="btn-group">
						<Button.Group>
				          <Button className="saveBtn" type="primary" htmlType="submit">
				            Save <Icon style={{float: 'right'}} type="down" />
				          </Button>

				          <Button className="cancelBtn" type="default">
				            Cancel
				          </Button>
				        </Button.Group>
				    </div>
			      </Col>
	            </Row>
          	</Form>
		);
	}
  }
);
export default NewContact;