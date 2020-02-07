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
    currentSelect: false,
    customers: [],
    currentKey: null,
    showData: []
  };
  moreOption = key => {
    this.setState({ moreOption: true, key: key });
  };
  async componentDidMount() {
    if(!this.props.noData) {
      let allCustomers = await customerService.getCustomers();
      this.setState({ customers: allCustomers, showData: allCustomers });
    }
  }
  componentDidUpdate(prevProps) {
    if(!this.props.noData) {
      if (this.props.customers !== prevProps.customers) {
        this.setState({
          customers: this.props.customers,
          showData: this.props.customers
        });
      }
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
  parentSelect = (data, status) => {
    this.setState({
      currentSelect: data,
      currentKey: status
    })
  } 
  phoneFormat = (value) => {
    let x = value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    return '(' + x[1] + ') ' + x[2] + '-' + x[3];
  }
  render() {
    const { moreOption, key, customers, showData, currentSelect, currentKey } = this.state;
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
              <p className="name bolderName">
                <span>{record.displayName}</span>
              </p>
              <p className="content">{record.companyName}</p>
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
            <p className="content">{text ? text : ''}</p>
            <p className="content">
              {record.city ? record.city : '' } {record.state  ? record.city : ''}
            </p>
          </div>
        )
      },
      {
        title: "Type",
        dataIndex: "customerType",
        key: "customerType",
        render: (text, record) => <p className="content otherContent">{record.customerType ? record.customerType : 'NA' }</p>
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: (text, record) => <p className="content otherContent">{record.phone ? this.phoneFormat(record.phone): 'NA'}</p>
      },
      {
        title: "Fax No.",
        dataIndex: "fax",
        key: "fax",
        render: text => <p className="content otherContent">{text? text: 'NA'}</p>
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
        <FilterSection filter={this.filteredData} customers={customers} parentSelect={this.parentSelect}/>
        <div id="customerListingTable" className={`${currentSelect ? 'overlay': ''}`}>
          <Table
            rowKey="key"
            className="customerListingTable"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={showData}
            rowKey={record => record._id}
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
