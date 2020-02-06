import React from "react";
import { Layout, Typography, Modal } from "antd";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import services from "../../services/customerService";
import "./index.css";
import AllSection from "../../components/TabSection/AllSection";
import CustomerCreateForm from "../../components/CustomerCreateForm";

const { Title } = Typography;
class Home extends React.Component {
  state = {
    isOpen: false,
    customers: [],
    isTabError: false,
    errorForm: false,
    defaultActiveKey: "0"
  };
  handleCreate = e => {
    e.preventDefault();
    const { form } = this.formRef.props;
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
        await services.createCustomer(values);
        let allCustomers = await services.getCustomers();
        this.setState({
          customers: allCustomers,
          isOpen: false,
          errorForm: false
        });
        form.resetFields();
      }
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  openModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { isOpen, defaultActiveKey, customers, errorForm, isTabError } = this.state;
    const tabs = [
      {
        tab: "All",
        component: <AllSection customers={customers} noData={false} />
      },
      {
        tab: "New",
        component: (
          <AllSection customers={[]} noData={true} />
        )
      },
      {
        tab: "Inactive",
        component: (
          <AllSection customers={[]} noData={true} />
        )
      }
    ];
    return (
      <Layout>
        <Header />
        <Title level={3} className="pageTitle">
          Customers
        </Title>
        <SubHeader
          defaultActiveKey={defaultActiveKey}
          tabPane={tabs}
          openModal={this.openModal}
          mainSubHeader={true}
        />
        <Modal
          className="customerInformation"
          title="Customer Information"
          visible={isOpen}
          destroyOnClose={true}
          onOk={() => this.setState({ isOpen: false,errorForm: false, defaultActiveKey: "0" })}
          onCancel={() =>
            this.setState({ isOpen: false, defaultActiveKey: "0", errorForm: false, isTabError: false })
          }
          footer={null}
        >
          <CustomerCreateForm
            errorForm={errorForm}
            wrappedComponentRef={this.saveFormRef}
            visible={isOpen}
            isTabError={isTabError}
            onCancel={() =>
              this.setState({
                isOpen: false,
                defaultActiveKey: "0",
                errorForm: false,
                isTabError: false
              })
            }
            onCreate={this.handleCreate}
          />
        </Modal>
      </Layout>
    );
  }
}

export default Home;
