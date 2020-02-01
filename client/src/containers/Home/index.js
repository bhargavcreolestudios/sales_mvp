import React from "react";
import { Layout, Typography, Modal } from "antd";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import "./index.css";
import AllSection from "../../components/TabSection/AllSection";
import CustomerCreateForm from "../../components/CustomerCreateForm";

import newCustomer from "../../assets/newCustomer.png";
import customerTypes from "../../assets/customerTypes.png";
import columnOptions from "../../assets/columnOptions.png";
import importCustomers from "../../assets/importCustomers.png";
import recycle from "../../assets/recycle.png";

const { Title } = Typography;
class Home extends React.Component {
  state = {
    isOpen: false,
    defaultActiveKey: "0"
  };

  handleCreate = e => {
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      } else {
        console.log("Received values of form: ", values);
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
    const { isOpen, defaultActiveKey } = this.state;
    const tabs = [
      {
        tab: "All",
        component: <AllSection />
      },
      {
        tab: "New",
        component: <div>hi</div>
      },
      {
        tab: "Inactive",
        component: <div>hi</div>
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
          onOk={() => this.setState({ isOpen: false, defaultActiveKey: "0" })}
          onCancel={() =>
            this.setState({ isOpen: false, defaultActiveKey: "0" })
          }
          footer={null}
        >
          <CustomerCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={isOpen}
            onCancel={() =>
              this.setState({ isOpen: false, defaultActiveKey: "0" })
            }
            onCreate={this.handleCreate}
          />
        </Modal>
      </Layout>
    );
  }
}

export default Home;
