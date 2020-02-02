import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Table, Popover, Divider } from "antd";
import iconMore from "../../assets/icoMoreo.svg";
import iconAddFile from "../../assets/icoAddfile.svg";
import iconEmail from "../../assets/icoMSend.svg";
import iconInactive from "../../assets/icoInvalid.svg";
import "./index.css";
import FilterSection from "../FilterSection";

// SERVICES
import customerService from "../../services/customerService";

class CustomerListSection extends React.Component {
  state = {
    key: 0,
    moreOption: false,
    customers: [],
    showData: []
  };
  moreOption = key => {
    this.setState({ moreOption: true, key: key });
  };
  async componentDidMount() {
    let allCustomers = await customerService.getCustomers();
    this.setState({ customers: allCustomers, showData: allCustomers });
  }
  componentDidUpdate(prevProps) {
    if (this.props.customers !== prevProps.customers) {
      this.setState({
        customers: this.props.customers,
        showData: this.props.customers
      });
    }
  }
  PopoverAction = (id, e) => {
    this.moreOption(id);
    e.stopPropagation();
  };
  onVisibleChange = (e, bool) => {
    if (!bool) this.setState({ moreOption: false, key: 0 });
  };
  filteredData = showData => {
    this.setState({ showData });
  };
  render() {
    const { moreOption, key, customers, showData } = this.state;
    const content = (
      <div className="CustomerListingActivityContent">
        <p>
          <img src={iconAddFile} />
          Create Statements
        </p>
        <Divider />
        <p>
          <img src={iconEmail} />
          Email
        </p>
        <Divider />
        <p>
          <img src={iconInactive} />
          Make Inactive
        </p>
      </div>
    );
    const columns = [
      {
        title: "Name",
        dataIndex: "firstName",
        key: "firstName",
        render: (text, record) => (
          <div className="nameWrapper">
            <div className="customTD fullNameWrapper">
              <p className="name">
                <span>{text}</span>
              </p>
              <p className="content">{record.displayName}</p>
            </div>
            <Popover
              content={content}
              placement="bottomLeft"
              trigger="click"
              onClick={this.PopoverAction.bind(this, record._id)}
              getPopupContainer={() =>
                document.getElementById("customerListingTable")
              }
              onVisibleChange={this.onVisibleChange.bind(this, record._id)}
            >
              <div
                className={
                  moreOption && key === record._id
                    ? `iconMoreWrapper active`
                    : `iconMoreWrapper `
                }
              >
                <img src={iconMore} />
              </div>
            </Popover>
          </div>
        )
      },
      {
        title: "Address",
        dataIndex: "billingAddress",
        key: "billingAddress",
        render: (text, record) => (
          <div className="customTD">
            <p className="content">{text}</p>
            <p className="content">
              {record.city} {record.state}
            </p>
          </div>
        )
      },
      {
        title: "Type",
        dataIndex: "customerType",
        key: "customerType",
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: "Fax No.",
        dataIndex: "fax",
        key: "fax",
        render: text => <p className="content otherContent">{text}</p>
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      }
      /*getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			}),*/
    };
    return (
      <>
        <FilterSection filter={this.filteredData} customers={customers} />
        <div id="customerListingTable">
          <Table
            rowKey="key"
            className="customerListingTable"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={showData}
            pagination={false}
            onRow={record => ({
              onClick: e => {
                this.props.history.push({
                  pathname: `/customer-detail/${record._id}`
                });
              }
            })}
          />
        </div>
      </>
    );
  }
}
export default withRouter(CustomerListSection);
