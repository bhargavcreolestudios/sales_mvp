import React from 'react';
import { Form, Radio, Input, Row, Col, Select, Tabs, Checkbox, Divider, Button, Icon } from 'antd';

import './index.css';

const { Option } = Select;
const { TabPane } = Tabs;

const CustomerCreateForm = Form.create({ name: 'form_in_modal' })(
//class CustomerCreateForm extends React.Component{
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
	              <Col className="col1" span={12}>
	              	<Form.Item label="Company">
		              {getFieldDecorator('company')(<Input />)}
		            </Form.Item>
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
		            <Form.Item label="Display Name">
		              {getFieldDecorator('displayName')(<Input />)}
		            </Form.Item>
		            <Form.Item label="Account Rep">
		              {getFieldDecorator('accountRep')(<Select
			              className="select"
			              placeholder="Select"
			              onChange={(value) => console.log(value)}
			            >
			              <Option value="test 1">test 1</Option>
			              <Option value="test 2">test 2</Option>
			            </Select>,
			          )}
		            </Form.Item>
		            <Form.Item label="Customer Type">
		              {getFieldDecorator('customerType')(<Select
		              	  className="select"
			              placeholder="Select"
			              onChange={(value) => console.log(value)}
			            >
			              <Option value="user 1">user 1</Option>
			              <Option value="user 2">user 2</Option>
			            </Select>,
			          )}
		            </Form.Item>
		          </Col>
		          <Col className="col2" span={12}>
		          	<Form.Item label="Email">
		              {getFieldDecorator('email')(<Input />)}
		            </Form.Item>
		            <Row>
		              <Col className="spaceBetween1" span={12}>
		              	<Form.Item label="Phone">
		              	  {getFieldDecorator('Phone')(<Input />)}
			            </Form.Item>
		              </Col>
		              <Col className="spaceBetween2" span={12}>
		                <Form.Item label="Mobile">
		              	  {getFieldDecorator('mobile')(<Input />)}
			            </Form.Item>
		              </Col>
		            </Row>
		            <Row>
		              <Col className="spaceBetween1" span={12}>
		              	<Form.Item label="Fax">
		              	  {getFieldDecorator('fax')(<Input />)}
			            </Form.Item>
		              </Col>
		              <Col className="spaceBetween2" span={12}>
		                <Form.Item label="Other">
		              	  {getFieldDecorator('other')(<Input />)}
			            </Form.Item>
		              </Col>
		            </Row>
		            <Form.Item className="radio">
		              {getFieldDecorator('isSubCustomer')(<Checkbox>Is Sub-Customer (Property)</Checkbox>,
			          )}
		            </Form.Item>
		            <Form.Item>
		              {getFieldDecorator('subCustomer')(<Select
		              	  className="select"
			              placeholder="Enter parent customer"
			              onChange={(value) => console.log(value)}
			              style={{ backgroundColor: '#eceef1', border: 'none', borderRadius: '7px' }}
			            >
			              <Option value="user 1">user 1</Option>
			              <Option value="user 2">user 2</Option>
			            </Select>,
			          )}
		            </Form.Item>
		            <Row>
		              <Col className="spaceBetween1" span={12}>
		              	<Form.Item label="Bill with Parent">
		              	  {getFieldDecorator('billParent')(<Select
			              	  className="select"
				              placeholder="Select"
				              onChange={(value) => console.log(value)}
				              style={{ backgroundColor: '#eceef1', border: 'none', borderRadius: '7px' }}
				            >
				              <Option value="user 1">user 1</Option>
				              <Option value="user 2">user 2</Option>
				            </Select>,
				          )}
			            </Form.Item>
		              </Col>
		              <Col className="spaceBetween2" span={12}>
		                <Form.Item label="Property Type">
		              	  {getFieldDecorator('propertyType')(<Select
			              	  className="select"
				              placeholder="Select"
				              onChange={(value) => console.log(value)}
				              style={{ backgroundColor: '#eceef1', border: 'none', borderRadius: '7px' }}
				            >
				              <Option value="user 1">user 1</Option>
				              <Option value="user 2">user 2</Option>
				            </Select>,
				          )}
			            </Form.Item>
		              </Col>
		            </Row>
		          </Col>
		          <Col className="col1" span={24}>
		            <Tabs defaultActiveKey="1">
					    <TabPane tab="Address" key="1">
					      <Row>
						      <Col className="spaceBetween1" span={12}>
							      <Form.Item label="Billing Address">
					                {getFieldDecorator('billingAddress')(<Input />)}
					              </Form.Item>
					              <Form.Item label="City">
					                {getFieldDecorator('city')(<Input />)}
					              </Form.Item>
					              <Row>
						              <Col className="spaceBetween1" span={12}>
						              	<Form.Item label="State">
						              	  {getFieldDecorator('state')(<Input />)}
							            </Form.Item>
						              </Col>
						              <Col className="spaceBetween2" span={12}>
						                <Form.Item label="Zip Code">
						              	  {getFieldDecorator('zipCode')(<Input />)}
							            </Form.Item>
						              </Col>
					              </Row>
				              </Col>
				              <Col className="spaceBetween2" span={12}>
							      {/*<Form.Item label="Shipping Address">
					                {getFieldDecorator('shippingAddress')(<div><Checkbox className="sameAddress">Same as billing address</Checkbox> <Input /></div>)}
					              </Form.Item>*/}
					              <Form.Item>
					              	<div className="shippingAddressWrapper">
					              		<label>Shipping Address</label>
					              		{getFieldDecorator('isShippingAddress')(<Checkbox className="sameAddress" onClick={()=> this.setState({ isSameAdd: !isSameAdd })}>Same as billing address</Checkbox>)}
					              	</div>
					              	<div>
					              		{getFieldDecorator('ShippingAddress')(<Input disabled={isSameAdd} />)}
					              	</div>
					              </Form.Item>
					              <Form.Item label="City">
					                {getFieldDecorator('city')(<Input disabled={isSameAdd} />)}
					              </Form.Item>
					              <Row>
						              <Col className="spaceBetween1" span={12}>
						              	<Form.Item label="State">
						              	  {getFieldDecorator('state')(<Input disabled={isSameAdd} />)}
							            </Form.Item>
						              </Col>
						              <Col className="spaceBetween2" span={12}>
						                <Form.Item label="Zip Code">
						              	  {getFieldDecorator('zipCode')(<Input disabled={isSameAdd} />)}
							            </Form.Item>
						              </Col>
					              </Row>
				              </Col>
				          </Row>
					    </TabPane>
					    <TabPane tab="Billing Details" key="2">
					      <Row>
						      
						      <Col className="col1" span={12}>
						      	<Row>
						      		<Col className="spaceBetween1" span={12}>
						      			<Form.Item label="Account No">
						              	  {getFieldDecorator('accountNo')(<Input />)}
							            </Form.Item>
						      		</Col>
						      		<Col className="spaceBetween2" span={12}>
						      		  <Form.Item label="Payment Terms">
							              {getFieldDecorator('paymentTerms')(<Select
							              	  className="select"
								              placeholder="Select"
								              onChange={(value) => console.log(value)}
								            >
								              <Option value="user 1">user 1</Option>
								              <Option value="user 2">user 2</Option>
								            </Select>,
								          )}
							          </Form.Item>
						      		</Col>
						      	</Row>
						      	<Row>
						      		<Col className="spaceBetween1" span={12}>
						      			<Form.Item label="Preferred Payment">
							              {getFieldDecorator('preferredPayment')(<Select
							              	  className="select"
								              placeholder="Select"
								              onChange={(value) => console.log(value)}
								            >
								              <Option value="user 1">user 1</Option>
								              <Option value="user 2">user 2</Option>
								            </Select>,
								          )}
							          </Form.Item>
						      		</Col>
						      		<Col className="spaceBetween2" span={12}>
						      		  <Form.Item label="Preferred Delivery">
							              {getFieldDecorator('preferredDelivery')(<Select
							              	  className="select"
								              placeholder="Select"
								              onChange={(value) => console.log(value)}
								            >
								              <Option value="user 1">user 1</Option>
								              <Option value="user 2">user 2</Option>
								            </Select>,
								          )}
							          </Form.Item>
						      		</Col>
						      	</Row>
						      	<Row>
						      		<Col className="spaceBetween1" span={12}>
						      			<Form.Item label="Opening Balance">
						              	  {getFieldDecorator('openingBalance')(<Input />)}
							            </Form.Item>
						      		</Col>
						      		<Col className="spaceBetween2" span={12}>
						      		  <Form.Item label="As Of">
						              	  {getFieldDecorator('asOf')(<Input />)}
							            </Form.Item>
						      		</Col>
						      	</Row>
				              </Col>

				              <Col className="col2" span={12}>
							      <Form.Item className="reasonSection">
						              {getFieldDecorator('reason')(<Select
						              	  className="select"
							              placeholder="Select a reason"
							              onChange={(value) => console.log(value)}
							            >
							              <Option value="user 1">user 1</Option>
							              <Option value="user 2">user 2</Option>
							            </Select>,
							          )}
						          </Form.Item>
						          <Form.Item label="Tax Resale No.">
					              	  {getFieldDecorator('taxResaleNo')(<Input />)}
					              </Form.Item>
					              <Form.Item label="Exemption Details">
					              	  {getFieldDecorator('exemptionDetails')(<Input />)}
						          </Form.Item>
				              </Col>
				          </Row>
					    </TabPane>
					</Tabs>
					<Divider type="horizontal" />
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
export default CustomerCreateForm;