import React from "react";
import { Form, Input, Row, Col, Checkbox, Divider, Button } from "antd";
import FormButton from "../Button";
import "./index.css";
const NewContact = Form.create({ name: "form_in_modal" })(
  //class NewContact extends React.Component{
  class extends React.Component {
    state = {
      contactDetail: {}
    };
    componentDidMount() {
      this.setState({
        contactDetail: this.props.contactInfo
      });
    }
    componentDidUpdate(prevProps) {
      if (this.props.contactInfo !== prevProps.contactInfo) {
        this.setState({
          contactDetail: this.props.contactInfo
        });
      }
    }
    render() {
      const { contactDetail } = this.state;
      const { visible, onCreate, form, isEdit } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form onSubmit={onCreate} layout="vertical" autoComplete="off">
          <Row>
            <Col className="col1" span={24}>
              <Row>
                <Col className="spaceBetween1" span={12}>
                  <Form.Item label="First Name" className="mandatoryField">
                    {getFieldDecorator("firstName", {
                      initialValue: isEdit ? contactDetail.firstName : "",
                      rules: [
                        { required: true, message: "Please enter first name!" }
                      ]
                    })(<Input autoComplete="off" />)}
                  </Form.Item>
                </Col>
                <Col className="spaceBetween2" span={12}>
                  <Form.Item label="Last Name">
                    {getFieldDecorator("lastName", {
                      initialValue: isEdit ? contactDetail.lastName : "",
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Title/Position">
                {getFieldDecorator("position", {
                  initialValue: isEdit ? contactDetail.position : "",
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Email">
                {getFieldDecorator("email", {
                  initialValue: isEdit ? contactDetail.email : "",
                  rules: [
                    { type: "email", message: "Please enter  valid email!" },
                  ]
                })(<Input />)}
              </Form.Item>
              <Row>
                <Col span={8}>
                  <Form.Item className="spaceBetween1" label="Mobile">
                    {getFieldDecorator("mobile", {
                      initialValue: isEdit ? contactDetail.mobile : "",
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className="spaceBetween2" label="Office No.">
                    {getFieldDecorator("officeNumber", {
                      initialValue: isEdit ? contactDetail.officeNumber : "",
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className="spaceBetween3" label="Extension">
                    {getFieldDecorator("extension", {
                      initialValue: isEdit ? contactDetail.extension : "",
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className="col1" span={24}>
              <Divider className="divider" type="horizontal" />
              {isEdit ? (
                <span className="inActiveLabel">
                  <Checkbox>Make inactive</Checkbox>
                </span>
              ) : (
                ""
              )}
              <div className="btn-grp">
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
export default NewContact;
