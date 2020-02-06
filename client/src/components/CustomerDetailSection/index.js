import React from "react";
import { Row, Col, Modal, notification, Spin } from "antd";
import { Link, withRouter } from "react-router-dom";
import Button from "../Button";
import customerService from "../../services/customerService";
import iconEdit from "../../assets/icoPedit.svg";
import customerImage from "../../assets/customerImage.png";
import CustomerEditForm from "../CustomerCreateForm";
import "./index.css";

class CustomerDetailSection extends React.Component {
  state = {
    loading: false,
    customerEditModal: false,
    isTabError: false,
    customerDetail: {},
    formRef: React.createRef()
  };
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      if (this.props.match.params.id) {
        let detail = await customerService.getCustomer(
          this.props.match.params.id
        );
        if (Object.keys(detail).length > 1) {
          this.setState({ customerDetail: detail });
        } else {
          notification["info"]({
            message: "No Record",
            description: "Redirecting to homepage.",
            duration: 1.5
          });
          setTimeout(() => {
            this.props.history.push("/");
          }, 2000);
        }
      } else {
        this.props.history.replace("/");
      }
      this.setState({ loading: false });
    } catch (error) {}
  }
  openEditCustomerModal = e => {
    e.preventDefault();
    this.setState({
      customerEditModal: true
    });
  };
  saveFormRef = formRef => {
    this.setState({
      formRef
    });
  };
  handleCreate = (e, values) => {
    e.preventDefault();
    const { formRef } = this.state;
    const { form } = formRef.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        if((err.accountNo || err.paymentTerms || err.preferredPayment || err.preferredDelivery || err.openingBalance ||err.asOf ||err.reason || err.taxResaleNo || err.exemptionDetails) && (!err.billingAddress || !err.city || !err.state || !err.zipCode)) {
          this.setState({
            isTabError: true
          });
        } else {
          this.setState({
            isTabError: false
          });
        } 
        this.setState({ errorForm: true });
        return;
      } else {
        if(values.shippingAddressSame) {
          delete values.shippingAddress;
          delete values.shippingCity;
          delete values.shippingState;
          delete values.shippingZipCode;
        }
        if(!values.isSubCustomer) {
          delete values.parentCustomer;
          delete values.billWithParent;
          delete values.propertyType;
        }
        await customerService.updateCustomer(
          this.props.match.params.id,
          values
        );
        let customerDetail = await customerService.getCustomer(
          this.props.match.params.id
        );
        this.setState({
          customerDetail,
          customerEditModal: false,
          errorForm: false
        });
        form.resetFields();
      }
    });
  };
  render() {
    const { customerEditModal, customerDetail, loading, isTabError } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <div className="customer-detail-section">
          <Row>
            <Col span={16}>
              <div className="titleWrapper">
                <h1 className="customerName">{`${
                  customerDetail.displayName
                    ? customerDetail.displayName
                    : "A & G Sales"
                }`}</h1>
                <a onClick={this.openEditCustomerModal}>
                  <img src={iconEdit} />
                </a>
              </div>
              <div>
                <div className="titleDetailSection">
                  <p>{`${
                    customerDetail.companyName
                      ? customerDetail.companyName
                      : "A & G Fence & Supply"
                  }`}</p>
                  <span></span>
                  <p>Manufacturer</p>
                </div>
              </div>
              <div>
                <div className="customerDetail">
                  <img src={customerImage} />
                  <div className="details">
                    <div>
                      <span>Phone:</span>{" "}
                      <p to="/">{`${
                        customerDetail.phone
                          ? customerDetail.phone
                          : "+1 (562) 803-1888"
                      }`}</p>
                    </div>
                    <div>
                      <span>Address:</span>
                      <p to="/">{`${
                        customerDetail.billingAddress
                          ? customerDetail.billingAddress
                          : "11926 Woodruff Ave. Downey, CA 90241"
                      }`}</p>
                    </div>
                    <div>
                      <span>E-mail:</span>{" "}
                      <p to="/">{`${
                        customerDetail.email
                          ? customerDetail.email
                          : "info@agsales.com"
                      }`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="statisticsWrapper">
                {/* <Button type="primary" className="btn-main">
                  <span>New Transaction</span>
                  <div className="dropDownIcon" />
                </Button> */}
                <Button type="primary">New Transaction</Button>
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
        <div id="modal-wrapper">
          <Modal
            title="Customer Information"
            className="customerInformation"
            destroyOnClose={true}
            getContainer={() => document.getElementById("modal-wrapper")}
            visible={customerEditModal}
            onOk={() => this.setState({ customerEditModal: false })}
            onCancel={() => this.setState({ customerEditModal: false, isTabError: false })}
            footer={null}
          >
            <CustomerEditForm
              customerInfo={customerDetail}
              isTabError={isTabError}
              wrappedComponentRef={this.saveFormRef}
              visible={customerEditModal}
              onCancel={() => this.setState({ customerEditModal: false, isTabError: false })}
              onCreate={this.handleCreate}
            />
          </Modal>
        </div>
      </Spin>
    );
  }
}
export default withRouter(CustomerDetailSection);
