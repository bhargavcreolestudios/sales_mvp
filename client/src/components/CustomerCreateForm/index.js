import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
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

const PhoneNumberInput = props => {
  const [phoneValue, setPhoneValue] = useState(props.value);
  useEffect(() => {
    setPhoneValue(props.value)
  }, [props.value]);
  const handleChange = e => {
    setPhoneValue(e.value)
    props.onChange(e.value);
  };
  return (
    <NumberFormat
      format="(###) ###-####"
      mask=""
      className="numberFormatInput"
      name={props['data-__field'].name}
      placeholder=""
      onValueChange={handleChange}
      value={phoneValue}
    />
  );
};
const CustomerCreateForm = Form.create({ name: 'form_in_modal' })(
  //class CustomerCreateForm extends React.Component{
  class extends React.Component {
    state = {
      isSameAdd: false,
      errorForm: false,
      customerDetail: {},
      isTab: false,
      isEdit: false,
      isSubCustomer: false
    };
    componentDidMount() {
      if (this.props.customerInfo) {
        this.setState({
          isEdit: true,
          customerDetail: this.props.customerInfo,
          isTab: this.props.isTabError,
          isSameAdd: this.props.customerInfo
            ? this.props.customerInfo.shippingAddressSame
            : false,
          isSubCustomer: this.props.customerInfo
            ? this.props.customerInfo.isSubCustomer
            : false
        });
      }
    }
    componentDidUpdate(prevProps) {
      if (this.props.errorForm !== prevProps.errorForm) {
        this.setState({
          errorForm: this.props.errorForm
        });
      }
      if (this.props.customerInfo !== prevProps.customerInfo) {
        this.setState({
          customerDetail: this.props.customerInfo,
          isSameAdd: this.props.customerInfo
            ? this.props.customerInfo.shippingAddressSame
            : true,
          isSubCustomer: this.props.customerInfo
            ? this.props.customerInfo.isSubCustomer
            : false
        });
      }
      if (this.props.isTabError !== prevProps.isTabError) {
        this.setState({
          isTab: this.props.isTabError
        });
      }
    }
    /* handlePhoneBlur = (e) => {
      this.props.form.validateFields(['phone'], (errors, values) => {
        console.log(errors, 'test')
        if(errors) {
          if(errors.phone) {
            return;
          }else {
            return;
          }
        }else {
          console.log(values, 'values')
        }
      })
    } */
    phoneNumberValidation = (rule, value, callback) => {
      try {
        if (!value) {
          callback();
        } else {
          let validNumber = /^\d{10}$/;
          if (validNumber.test(value)) {
            callback();
          }
          // else if(validNumber.test(value)) {}
          else {
            callback([new Error('Must be 10 Number')]);
          }
        }
      } catch (e) {
        console.log(e, 'eee');
      }
    };
    render() {
      const {
        isSameAdd,
        isSubCustomer,
        errorForm,
        isTab,
        isEdit,
        customerDetail
      } = this.state;
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form onSubmit={onCreate} layout="vertical" autoComplete="off">
          {/* <input autoComplete="off" name="hidden" type="text" style="display:none;"></input> */}
          <Row>
            <Col className="col1" span={12}>
              <Form.Item label="Company">
                {getFieldDecorator('companyName', {
                  initialValue: isEdit ? customerDetail.companyName : ''
                })(<Input />)}
              </Form.Item>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="First Name">
                    {getFieldDecorator('firstName', {
                      initialValue: isEdit ? customerDetail.firstName : ''
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Last Name">
                    {getFieldDecorator('lastName', {
                      initialValue: isEdit ? customerDetail.lastName : ''
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
                  initialValue: isEdit ? customerDetail.accountRep : undefined
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
                  initialValue: isEdit ? customerDetail.customerType : undefined
                })(
                  <Select
                    className="select"
                    placeholder="Select"
                    onChange={value => console.log(value)}
                  >
                    <Option value="Architect">Architect</Option>
                    <Option value="Contractor">Contractor</Option>
                    <Option value="End Users">End Users</Option>

                    <Option value="Property Management">
                      Property Management
                    </Option>
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
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="Phone">
                    {getFieldDecorator('phone', {
                      initialValue: isEdit ? customerDetail.phone : '',
                      rules: [{ validator: this.phoneNumberValidation }]
                    })(<PhoneNumberInput />)}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Mobile">
                    {getFieldDecorator('mobile', {
                      initialValue: isEdit ? customerDetail.mobile : ''
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="Fax">
                    {getFieldDecorator('fax', {
                      initialValue: isEdit ? customerDetail.fax : ''
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
                  initialValue: customerDetail.isSubCustomer || false,
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
                {getFieldDecorator('parentCustomer', {
                  initialValue: customerDetail.parentCustomer || undefined,
                  rules: [
                    {
                      required: isSubCustomer,
                      message: 'Please select parent customer!'
                    }
                  ]
                })(
                  <Select
                    disabled={!isSubCustomer}
                    className="select"
                    placeholder="Enter parent customer"
                    onChange={value => console.log(value)}
                  >
                    <Option value="John Doe">John Doe</Option>
                    <Option value="John Clue">John Clue</Option>
                  </Select>
                )}
              </Form.Item>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="Bill with Parent">
                    {getFieldDecorator('billWithParent', {
                      initialValue: customerDetail.billWithParent || undefined,
                      rules: [
                        {
                          required: isSubCustomer,
                          message: 'Please select bill parent!'
                        }
                      ]
                    })(
                      <Select
                        disabled={!isSubCustomer}
                        className="select"
                        placeholder="Select"
                        onChange={value => console.log(value)}
                      >
                        <Option value="John Doe">John Doe</Option>
                        <Option value="John Clue">John Clue</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Property Type">
                    {getFieldDecorator('propertyType', {
                      initialValue: customerDetail.propertyType || undefined,
                      rules: [
                        {
                          required: isSubCustomer,
                          message: 'Please select property type!'
                        }
                      ]
                    })(
                      <Select
                        disabled={!isSubCustomer}
                        className="select"
                        placeholder="Select"
                        onChange={value => console.log(value)}
                      >
                        <Option value="Real property">Real property</Option>
                        <Option value="Personal property">
                          Personal property
                        </Option>
                        <Option value="Public property">Public property</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className="col1" span={24}>
              <Tabs
                activeKey={isTab ? '2' : '1'}
                // defaultActiveKey={isTab ? "2" : "1"}
                onChange={activeKey => {
                  this.setState({
                    isTab: activeKey === '1' ? false : true
                  });
                }}
                // className={errorForm ? 'errorTabAstrik' : ''}
              >
                <TabPane tab="Address" key="1">
                  <Row>
                    <Col className="spaceBetween1" span={12}>
                      <Form.Item label="Billing Address">
                        {getFieldDecorator('billingAddress', {
                          initialValue: isEdit
                            ? customerDetail.billingAddress
                            : ''
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="City">
                        {getFieldDecorator('city', {
                          initialValue: isEdit ? customerDetail.city : ''
                        })(<Input />)}
                      </Form.Item>
                      <Row>
                        <Col className="spaceBetween1" span={12}>
                          <Form.Item label="State">
                            {getFieldDecorator('state', {
                              initialValue: isEdit ? customerDetail.state : ''
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="Zip Code">
                            {getFieldDecorator('zipCode', {
                              initialValue: isEdit ? customerDetail.zipCode : ''
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="spaceBetween2" span={12}>
                      <Form.Item>
                        <div className="shippingAddressWrapper">
                          <label>Shipping Address</label>
                          {getFieldDecorator('shippingAddressSame', {
                            initialValue:
                              customerDetail.shippingAddressSame || false,
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
                              : ''
                            // rules: [
                            //   {
                            //     required: !isSameAdd,
                            //     message: 'Please enter shipping address!'
                            //   }
                            // ]
                          })(<Input disabled={isSameAdd} />)}
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="City" className="relativeTop">
                        {getFieldDecorator('shippingCity', {
                          initialValue: isEdit
                            ? customerDetail.shippingCity
                            : ''
                        })(<Input disabled={isSameAdd} />)}
                      </Form.Item>
                      <Row>
                        <Col className="spaceBetween1" span={12}>
                          <Form.Item label="State" className="relativeTop">
                            {getFieldDecorator('shippingState', {
                              initialValue: isEdit
                                ? customerDetail.shippingState
                                : ''
                            })(<Input disabled={isSameAdd} />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="Zip Code" className="relativeTop">
                            {getFieldDecorator('shippingZipCode', {
                              initialValue: isEdit
                                ? customerDetail.shippingZipCode
                                : ''
                              // rules: [
                              //   {
                              //     required: !isSameAdd,
                              //     message: 'Please enter zip code!'
                              //   }
                              // ]
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
                                : ''
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="Payment Terms">
                            {getFieldDecorator('paymentTerms', {
                              initialValue: isEdit
                                ? customerDetail.paymentTerms
                                : undefined
                            })(
                              <Select className="select" placeholder="Select">
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
                                : undefined
                            })(
                              <Select className="select" placeholder="Select">
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
                                : undefined
                            })(
                              <Select className="select" placeholder="Select">
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
                                }
                              ]
                            })(<InputNumber />)}
                          </Form.Item>
                        </Col>
                        <Col className="spaceBetween2" span={12}>
                          <Form.Item label="As Of">
                            {getFieldDecorator('asOf', {
                              initialValue: isEdit ? customerDetail.asOf : ''
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>

                    <Col className="col2" span={12}>
                      <Form.Item className="reasonSection">
                        {getFieldDecorator('reason', {
                          initialValue: isEdit
                            ? customerDetail.reason
                            : undefined
                        })(
                          <Select
                            className="select"
                            placeholder="Select a reason"
                            onChange={value => console.log(value)}
                          >
                            <Option value="reason 1">reason 1</Option>
                            <Option value="reason 2">reason 2</Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label="Tax Resale No.">
                        {getFieldDecorator('taxResaleNo', {
                          initialValue: isEdit ? customerDetail.taxResaleNo : ''
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Exemption Details">
                        {getFieldDecorator('exemptionDetails', {
                          initialValue: isEdit
                            ? customerDetail.exemptionDetails
                            : ''
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
