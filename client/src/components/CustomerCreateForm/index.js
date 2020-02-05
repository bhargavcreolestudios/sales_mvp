import React from 'react';
import {
  Form,
  Radio,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
  Tabs,
  Checkbox,
  Divider,
  Button,
  Icon
} from 'antd';

import FormButton from '../Button';
import './index.css';

const { Option } = Select;
const { TabPane } = Tabs;

const CustomerCreateForm = Form.create({ name: 'form_in_modal' })(
  //class CustomerCreateForm extends React.Component{
  class extends React.Component {
    state = {
      isSameAdd: false,
      errorForm: false,
      customerDetail: {},
      isEdit: false,
      isSubCustomer: true
    };
    componentDidMount() {
      if (this.props.customerInfo) {
        this.setState({
          isEdit: true,
          customerDetail: this.props.customerInfo
        });
      }
    }
    componentDidUpdate(prevProps) {
      if (this.props.errorForm !== prevProps.errorForm) {
        this.setState({
          errorForm: this.props.errorForm
        });
      }
      if(this.props.customerInfo !== prevProps.customerInfo) {
        this.setState({
          customerDetail: this.props.customerInfo
        });
      }
    }
    render() {
      const {
        isSameAdd,
        isSubCustomer,
        errorForm,
        isEdit,
        customerDetail
      } = this.state;
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form onSubmit={onCreate} layout="vertical">
          <Row>
            <Col className="col1" span={12}>
              <Form.Item label="Company">
                {getFieldDecorator('companyName', {
                  initialValue: isEdit ? customerDetail.companyName : '',
                  rules: [
                    { required: true, message: 'Please enter company name!' }
                  ]
                })(<Input />)}
              </Form.Item>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="First Name">
                    {getFieldDecorator('firstName', {
                      initialValue: isEdit ? customerDetail.firstName : '',
                      rules: [
                        { required: true, message: 'Please enter first name!' }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Last Name">
                    {getFieldDecorator('lastName', {
                      initialValue: isEdit ? customerDetail.lastName : '',
                      rules: [
                        { required: true, message: 'Please enter last name!' }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Display Name">
                {getFieldDecorator('displayName', {
                  initialValue: isEdit ? customerDetail.displayName : '',
                  rules: [
                    { required: true, message: 'Please enter display name!' }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Account Rep">
                {getFieldDecorator('accountRep', {
                  initialValue: isEdit ? customerDetail.accountRep : undefined,
                  rules: [
                    { required: true, message: 'Please select account rep!' }
                  ]
                })(
                  <Select
                    className="select"
                    placeholder="Select"
                    onChange={value => console.log(value)}
                  >
                    <Option value="Jillian Crain">Jillian Crain</Option>
                    <Option value="Jeff Osborne">Jeff Osborne</Option>
                    <Option value="Cindy Truett">Cindy Truett</Option>

                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Customer Type">
                {getFieldDecorator('customerType', {
                  initialValue: isEdit ? customerDetail.customerType : undefined,
                  rules: [
                    { required: true, message: 'Please select customer type!' }
                  ]
                })(
                  <Select
                    className="select"
                    placeholder="Select"
                    onChange={value => console.log(value)}
                  >
                    <Option value="Architect">Architect</Option>
                    <Option value="Contractor">Contractor</Option>
                    <Option value="End Users">End Users</Option>

                    <Option value="Property Management">Property Management</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col className="col2" span={12}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  initialValue: isEdit ? customerDetail.email : '',
                  rules: [
                    {
                      type: 'email',
                      message: 'Please enter valid email address'
                    },
                    { required: true, message: 'Please enter email address!' }
                  ]
                })(<Input />)}
              </Form.Item>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="Phone">
                    {getFieldDecorator('phone', {
                      initialValue: isEdit ? customerDetail.phone : '',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter phone number!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Mobile">
                    {getFieldDecorator('mobile', {
                      initialValue: isEdit ? customerDetail.mobile : '',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter mobile number!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="Fax">
                    {getFieldDecorator('fax', {
                      initialValue: isEdit ? customerDetail.fax : '',
                      rules: [
                        { required: true, message: 'Please enter FAX number!' }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Other">
                    {getFieldDecorator('other', {
                      initialValue: isEdit ? customerDetail.other : ''
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="radio">
                {getFieldDecorator('isSubCustomer', {
                  valuePropName: 'checked'
                })(
                  <Checkbox
                    onClick={() =>
                      this.setState({ isSubCustomer: !isSubCustomer })
                    }
                  >
                    Is Sub-Customer (Property)
                  </Checkbox>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('subCustomer', {
                  rules: [
                    {
                      required: !isSubCustomer,
                      message: 'Please select parent customer!'
                    }
                  ]
                })(
                  <Select
                    disabled={isSubCustomer}
                    className="select"
                    placeholder="Enter parent customer"
                    onChange={value => console.log(value)}
                  >
                    <Option value="user 1">user 1</Option>
                    <Option value="user 2">user 2</Option>
                  </Select>
                )}
              </Form.Item>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="Bill with Parent">
                    {getFieldDecorator('billParent', {
                      rules: [
                        {
                          required: !isSubCustomer,
                          message: 'Please select bill parent!'
                        }
                      ]
                    })(
                      <Select
                        disabled={isSubCustomer}
                        className="select"
                        placeholder="Select"
                        onChange={value => console.log(value)}
                      >
                        <Option value="user 1">user 1</Option>
                        <Option value="user 2">user 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Property Type">
                    {getFieldDecorator('propertyType', {
                      rules: [
                        {
                          required: !isSubCustomer,
                          message: 'Please select property type!'
                        }
                      ]
                    })(
                      <Select
                        disabled={isSubCustomer}
                        className="select"
                        placeholder="Select"
                        onChange={value => console.log(value)}
                      >
                        <Option value="user 1">user 1</Option>
                        <Option value="user 2">user 2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className="col1" span={24}>
              <Tabs
                defaultActiveKey="1"
                className={errorForm ? 'errorTabAstrik' : ''}
              >
                <TabPane tab="Address" key="1">
                  <Row>
                    <Col className="spaceBetween1" span={12}>
                      <Form.Item label="Billing Address">
                        {getFieldDecorator('billingAddress', {
                          initialValue: isEdit
                            ? customerDetail.billingAddress
                            : '',
                          rules: [
                            { required: true, message: 'Please enter address!' }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="City">
                        {getFieldDecorator('city', {
                          initialValue: isEdit
                            ? customerDetail.city
                            : '',
                          rules: [
                            {
                              required: true,
                              message: 'Please enter city name!'
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Row>
                        <Col className="spaceBetween1" span={12}>
                          <Form.Item label="State">
                            {getFieldDecorator('state', {
                              initialValue: isEdit
                                ? customerDetail.state
                                : '',
                              rules: [
                                {
                                  required: true,
                                  message: 'Please enter state name!'
                                }
                              ]
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="Zip Code">
                            {getFieldDecorator('zipCode', {
                              initialValue: isEdit
                                ? customerDetail.zipCode
                                : '',
                              rules: [
                                {
                                  required: true,
                                  message: 'Please enter zip code!'
                                }
                              ]
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
                          {getFieldDecorator('isShippingAddress', {
                            valuePropName: 'checked'
                          })(
                            <Checkbox
                              className="sameAddress"
                              onClick={() =>
                                this.setState({ isSameAdd: !isSameAdd })
                              }
                            >
                              Same as billing address
                            </Checkbox>
                          )}
                        </div>
                        <Form.Item>
                          {getFieldDecorator('shippingAddress', {
                             initialValue: isEdit
                             ? customerDetail.shippingAddress
                             : '',
                            rules: [
                              {
                                required: !isSameAdd,
                                message: 'Please enter shipping address!'
                              }
                            ]
                          })(<Input disabled={isSameAdd} />)}
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="City" className="relativeTop">
                        {getFieldDecorator('shippingCity', {
                          initialValue: isEdit
                          ? customerDetail.shippingCity
                          : '',
                          rules: [
                            {
                              required: !isSameAdd,
                              message: 'Please enter city name!'
                            }
                          ]
                        })(<Input disabled={isSameAdd} />)}
                      </Form.Item>
                      <Row>
                        <Col className="spaceBetween1" span={12}>
                          <Form.Item label="State" className="relativeTop">
                            {getFieldDecorator('shippingState', {
                              initialValue: isEdit
                              ? customerDetail.shippingState
                              : '',
                              rules: [
                                {
                                  required: !isSameAdd,
                                  message: 'Please enter state name!'
                                }
                              ]
                            })(<Input disabled={isSameAdd} />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="Zip Code" className="relativeTop">
                            {getFieldDecorator('shippingZipCode', {
                              initialValue: isEdit
                              ? customerDetail.shippingZipCode
                              : '',
                              rules: [
                                {
                                  required: !isSameAdd,
                                  message: 'Please enter zip code!'
                                }
                              ]
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
                              initialValue: isEdit
                                ? customerDetail.accountNo
                                : '',
                              rules: [
                                {
                                  required: true,
                                  message: 'Please enter account number!'
                                }
                              ]
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="Payment Terms">
                            {getFieldDecorator('paymentTerms', {
                              initialValue: isEdit
                                ? customerDetail.paymentTerms
                                : undefined,
                              rules: [
                                {
                                  required: true,
                                  message: 'Please select payment terms!'
                                }
                              ]
                            })(
                              <Select
                                className="select"
                                placeholder="Select"
                              >
                                <Option value="6 Month">6 Month</Option>
                                <Option value="1 Year">1 Year</Option>
                              </Select>
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="spaceBetween1" span={12}>
                          <Form.Item label="Preferred Payment">
                            {getFieldDecorator('preferredPayment', {
                              initialValue: isEdit
                                ? customerDetail.preferredPayment
                                : undefined,
                              rules: [
                                {
                                  required: true,
                                  message: 'Please select preferred payment!'
                                }
                              ]
                            })(
                              <Select
                                className="select"
                                placeholder="Select"
                              >
                                <Option value="Cash">Cash</Option>
                                <Option value="Credit Card">Credit Card</Option>
                                <Option value="Net Banking">Net Banking</Option>
                              </Select>
                            )}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="Preferred Delivery">
                            {getFieldDecorator('preferredDelivery', {
                              initialValue: isEdit
                                ? customerDetail.preferredDelivery
                                : undefined,
                              rules: [
                                {
                                  required: true,
                                  message: 'Please select preferred delivery!'
                                }
                              ]
                            })(
                              <Select
                                className="select"
                                placeholder="Select"
                              >
                                <Option value="Today">Today</Option>
                                <Option value="Tomorrow">Tomorrow</Option>
                              </Select>
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="spaceBetween1" span={12}>
                          <Form.Item label="Opening Balance">
                            {getFieldDecorator('openingBalance', {
                              initialValue: isEdit
                                ? customerDetail.openingBalance
                                : '',
                              rules: [
                                {
                                  type: 'number',
                                  message: 'Invalid Number'
                                },
                                {
                                  required: true,
                                  message: 'Please enter opening balance!'
                                }
                              ]
                            })(<InputNumber />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="As Of">
                            {getFieldDecorator('asOf', {
                              initialValue: isEdit ? customerDetail.asOf : '',
                              rules: [
                                {
                                  required: true,
                                  message: 'Please enter as of!'
                                }
                              ]
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>

                    <Col className="col2" span={12}>
                      <Form.Item className="reasonSection">
                        {getFieldDecorator('reason', {
                          initialValue: isEdit ? customerDetail.reason : undefined,
                          rules: [
                            {
                              required: true,
                              message: 'Please select a reason!'
                            }
                          ]
                        })(
                          <Select
                            className="select"
                            placeholder="Select a reason"
                            onChange={value => console.log(value)}
                          >
                            <Option value="user 1">user 1</Option>
                            <Option value="user 2">user 2</Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label="Tax Resale No.">
                        {getFieldDecorator('taxResaleNo', {
                          initialValue: isEdit
                            ? customerDetail.taxResaleNo
                            : '',
                          rules: [
                            {
                              required: true,
                              message: 'Please enter tax resale number!'
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Exemption Details">
                        {getFieldDecorator('exemptionDetails', {
                          initialValue: isEdit
                            ? customerDetail.exemptionDetails
                            : '',
                          rules: [
                            {
                              required: true,
                              message: 'Please enter exemption details!'
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
              <Divider type="horizontal" />
              <div className="btn-group">
                <FormButton type="primary" htmlType="submit">
                  Save
                </FormButton>
                <Button
                  className="cancelBtn"
                  type="default"
                  onClick={() => {
                    form.resetFields();
                    this.props.onCancel();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      );
    }
  }
);
export default CustomerCreateForm;
