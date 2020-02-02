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
    errorForm: false,
    defaultActiveKey: "0"
  };

  handleCreate = e => {
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        this.setState({ errorForm: true });
        return;
      } else {
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
    const { isOpen, defaultActiveKey, customers, errorForm } = this.state;
    const tabs = [
      {
        tab: "All",
        component: <AllSection customers={customers} />
      },
      {
        tab: "New",
        component: (
          <h2 style={{ textAlign: "center", color: "#aaaaaa" }}>
            No Data Found
          </h2>
        )
      },
      {
        tab: "Inactive",
        component: (
          <h2 style={{ textAlign: "center", color: "#aaaaaa" }}>
            No Data Found
          </h2>
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
          onOk={() => this.setState({ isOpen: false, defaultActiveKey: "0" })}
          onCancel={() =>
            this.setState({ isOpen: false, defaultActiveKey: "0" })
          }
          footer={null}
        >
          <CustomerCreateForm
            errorForm={errorForm}
            wrappedComponentRef={this.saveFormRef}
            visible={isOpen}
            onCancel={() =>
              this.setState({
                isOpen: false,
                defaultActiveKey: "0",
                errorForm: false
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
