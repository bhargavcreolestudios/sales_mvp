import React from 'react';
import { Form, Radio, Input, Row, Col, Select, Tabs, Checkbox, Divider, Button, Icon } from 'antd';

import './index.css';

const { Option } = Select;
const { TabPane } = Tabs;

const CustomerCreateForm = Form.create({ name: 'form_in_modal' })(
//class CustomerCreateForm extends React.Component{
  class extends React.Component {
  	state = { 
  		isSameAdd: false,
		isSubCustomer: true
  	}
	render(){
		const { isSameAdd, isSubCustomer } = this.state
		const { visible, onCancel, onCreate, form } = this.props;
  		const { getFieldDecorator } = form;
		return (
      		<Form onSubmit={onCreate} layout="vertical">
	            <Row>
	              <Col className="col1" span={12}>
	              	<Form.Item label="Company">
		              {getFieldDecorator('company', {
			                rules: [{ required: true, message: 'Please enter company name!' }],
			              })(<Input />)}
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
		              	  {getFieldDecorator('lastName', {
			                rules: [{ required: true, message: 'Please enter last name!' }],
			            })(<Input />)}
			            </Form.Item>
		              </Col>
		            </Row>
		            <Form.Item label="Display Name">
		              {getFieldDecorator('displayName', {
			                rules: [{ required: true, message: 'Please enter display name!' }],
			            })(<Input />)}
		            </Form.Item>
		            <Form.Item label="Account Rep">
		              {getFieldDecorator('accountRep', {
			                rules: [{ required: true, message: 'Please select account rep!' }],
			            })(<Select
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
		              {getFieldDecorator('customerType', {
			                rules: [{ required: true, message: 'Please select customer type!' }],
			            })(<Select
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
		              {getFieldDecorator('email', {
			                rules: [{ required: true, message: 'Please enter email address!' }],
			            })(<Input />)}
		            </Form.Item>
		            <Row>
		              <Col className="spaceBetween1" span={12}>
		              	<Form.Item label="Phone">
		              	  {getFieldDecorator('Phone', {
			                rules: [{ required: true, message: 'Please enter phone number!' }],
			            })(<Input />)}
			            </Form.Item>
		              </Col>
		              <Col className="spaceBetween2" span={12}>
		                <Form.Item label="Mobile">
		              	  {getFieldDecorator('mobile', {
			                rules: [{ required: true, message: 'Please enter mobile number!' }],
			            })(<Input />)}
			            </Form.Item>
		              </Col>
		            </Row>
		            <Row>
		              <Col className="spaceBetween1" span={12}>
		              	<Form.Item label="Fax">
		              	  {getFieldDecorator('fax', {
			                rules: [{ required: true, message: 'Please enter FAX number!' }],
			            })(<Input />)}
			            </Form.Item>
		              </Col>
		              <Col className="spaceBetween2" span={12}>
		                <Form.Item label="Other">
		              	  {getFieldDecorator('other')(<Input />)}
			            </Form.Item>
		              </Col>
		            </Row>
		            <Form.Item className="radio">
		              {getFieldDecorator('isSubCustomer')(<Checkbox onClick={()=> this.setState({ isSubCustomer: !isSubCustomer})}>Is Sub-Customer (Property)</Checkbox>,
			          )}
		            </Form.Item>
		            <Form.Item>
		              {getFieldDecorator('subCustomer', {
			                rules: [{ required: !isSubCustomer, message: 'Please select parent customer!' }],
			            })(<Select
		              	  disabled={isSubCustomer}
		              	  className="select"
			              placeholder="Enter parent customer"
			              onChange={(value) => console.log(value)}
			            >
			              <Option value="user 1">user 1</Option>
			              <Option value="user 2">user 2</Option>
			            </Select>,
			          )}
		            </Form.Item>
		            <Row>
		              <Col className="spaceBetween1" span={12}>
		              	<Form.Item label="Bill with Parent">
		              	  {getFieldDecorator('billParent', {
			                rules: [{ required: !isSubCustomer, message: 'Please select bill parent!' }],
			            })(<Select
		              	  	  disabled={isSubCustomer}
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
		                <Form.Item label="Property Type">
		              	  {getFieldDecorator('propertyType', {
			                rules: [{ required: !isSubCustomer, message: 'Please select property type!' }],
			            })(<Select
		              	  	  disabled={isSubCustomer}
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
		          </Col>
		          <Col className="col1" span={24}>
		            <Tabs defaultActiveKey="1">
					    <TabPane tab="Address" key="1">
					      <Row>
						      <Col className="spaceBetween1" span={12}>
							      <Form.Item label="Billing Address">
					                {getFieldDecorator('billingAddress', {
						                rules: [{ required: true, message: 'Please enter address!' }],
						            })(<Input />)}
					              </Form.Item>
					              <Form.Item label="City">
					                {getFieldDecorator('billingCity', {
						                rules: [{ required: true, message: 'Please enter city name!' }],
						            })(<Input />)}
					              </Form.Item>
					              <Row>
						              <Col className="spaceBetween1" span={12}>
						              	<Form.Item label="State">
						              	  {getFieldDecorator('billingState', {
						                rules: [{ required: true, message: 'Please enter state name!' }],
						            })(<Input />)}
							            </Form.Item>
						              </Col>
						              <Col className="spaceBetween2" span={12}>
						                <Form.Item label="Zip Code">
						              	  {getFieldDecorator('billingZipCode', {
						                rules: [{ required: true, message: 'Please enter zip code!' }],
						            })(<Input />)}
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
					              	<Form.Item>
					              		{getFieldDecorator('shipaddress', {
						                rules: [{ required: !isSameAdd, message: 'Please enter shipping address!' }],
						            })(<Input disabled={isSameAdd} />)}
					              	</Form.Item>
					              </Form.Item>
					              <Form.Item label="City">
					                {getFieldDecorator('city', {
						                rules: [{ required: !isSameAdd, message: 'Please enter city name!' }],
						            })(<Input disabled={isSameAdd} />)}
					              </Form.Item>
					              <Row>
						              <Col className="spaceBetween1" span={12}>
						              	<Form.Item label="State">
						              	  {getFieldDecorator('state', {
						                	rules: [{ required: !isSameAdd, message: 'Please enter state name!' }],
						                  })(<Input disabled={isSameAdd} />)}
							            </Form.Item>
						              </Col>
						              <Col className="spaceBetween2" span={12}>
						                <Form.Item label="Zip Code">
						              	  {getFieldDecorator('zipCode', {
						                	rules: [{ required: !isSameAdd, message: 'Please enter zip code!' }],
						                  })(<Input disabled={isSameAdd} />)}
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
						              	  {getFieldDecorator('accountNo', {
						                	rules: [{ required: true, message: 'Please enter account number!' }],
						                  })(<Input />)}
							            </Form.Item>
						      		</Col>
						      		<Col className="spaceBetween2" span={12}>
						      		  <Form.Item label="Payment Terms">
							              {getFieldDecorator('paymentTerms', {
						                	rules: [{ required: true, message: 'Please select payment terms!' }],
						                  })(<Select
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
							              {getFieldDecorator('preferredPayment', {
						                	rules: [{ required: true, message: 'Please select preferred payment!' }],
						                  })(<Select
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
							              {getFieldDecorator('preferredDelivery', {
						                	rules: [{ required: true, message: 'Please select preferred delivery!' }],
						                  })(<Select
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
						              	  {getFieldDecorator('openingBalance', {
						                	rules: [{ required: true, message: 'Please enter opening balance!' }],
						                  })(<Input />)}
							            </Form.Item>
						      		</Col>
						      		<Col className="spaceBetween2" span={12}>
						      		  <Form.Item label="As Of">
						              	  {getFieldDecorator('asOf', {
						                	rules: [{ required: true, message: 'Please enter as of!' }],
						                  })(<Input />)}
							            </Form.Item>
						      		</Col>
						      	</Row>
				              </Col>

				              <Col className="col2" span={12}>
							      <Form.Item className="reasonSection">
						              {getFieldDecorator('reason', {
						                	rules: [{ required: true, message: 'Please select a reason!' }],
						                  })(<Select
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
					              	  {getFieldDecorator('taxResaleNo', {
						                	rules: [{ required: true, message: 'Please enter tax resale number!' }],
						                  })(<Input />)}
					              </Form.Item>
					              <Form.Item label="Exemption Details">
					              	  {getFieldDecorator('exemptionDetails', {
						                	rules: [{ required: true, message: 'Please enter exemption details!' }],
						                  })(<Input />)}
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