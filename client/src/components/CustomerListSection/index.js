import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Table, Popover, Divider } from "antd";
import iconMore from "../../assets/iconMore.png";
import iconAddFile from "../../assets/icoAddfile.svg";
import iconEmail from "../../assets/icoMSend.svg";
import iconInactive from "../../assets/icoInvalid.svg";
import "./index.css";

// SERVICES
import customerService from "../../services/customerService";

class CustomerListSection extends React.Component {
  state = {
    key: 0,
    moreOption: false,
    customers: []
  };
  moreOption = key => {
    this.setState({ moreOption: true, key: key });
  };
  async componentDidMount() {
    const { customers } = this.state;
    let allCustomers = await customerService.getAll();
    this.setState({ customers: allCustomers });
  }
  PopoverAction = (id, e) => {
    this.moreOption(id);
    e.stopPropagation();
  };
  onVisibleChange = (e, bool) => {
    if (!bool) this.setState({ moreOption: false, key: 0 });
  };
  render() {
    const { moreOption, key, customers } = this.state;
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
    const data = [
      {
        key: 1,
        firstName: "A & G Sales",
        displayName: "A & G Sales Fence & Supply",
        billingAddress: "11926 Woodruff Ave.",
        city: "Downey, ",
        state: "CA 90241",
        customerType: "[ASSIGNED]",
        phone: "(562) 803-1888",
        fax: "(562) 803-1888"
      },
      {
        key: 2,
        firstName: "Able Crane Service",
        displayName: "Able Crane Service",
        billingAddress: "P.O. Box 2806",
        city: "Santa Fe Springs,",
        state: " CA 90670",
        customerType: "Rental Equipment",
        phone: "(562) 946-1796",
        fax: "(626) 454-1602"
      },
      {
        key: 3,
        firstName: "AC Gates",
        displayName: "ACFolding Gates",
        billingAddress: "1374 E. Ninth St.",
        city: "Pomona, ",
        state: "CA 91766",
        customerType: "Manufacturer",
        phone: "(866) 944-2837",
        fax: "(866) 796-4283"
      },
      {
        key: 4,
        firstName: "Academy",
        displayName: "Academy Doors",
        billingAddress: "555 Maitland Ave",
        city: "Ontario, ",
        state: "CA 91761",
        customerType: "Manufacturer",
        phone: "(909) 988-0517",
        fax: "(909) 391-7024"
      },
      {
        key: 5,
        firstName: "ACME",
        displayName: "ACME Home Elevator",
        billingAddress: "4740 E. 2nd Street, Suite 200",
        city: "Benicia, ",
        state: "CA 94510",
        customerType: "Subcontractor",
        phone: "(562) 946-1796",
        fax: "(626) 454-1602"
      },
      {
        key: 6,
        firstName: "Able Crane Service",
        displayName: "Able Crane Service",
        billingAddress: "P.O. Box 2806",
        city: "Santa Fe Springs, ",
        state: "CA 90670",
        customerType: "Rental Equipment",
        phone: "(562) 946-1796",
        fax: "(626) 454-1602"
      },
      {
        key: 7,
        firstName: "AC Gates",
        displayName: "ACFolding Gates",
        billingAddress: "1374 E. Ninth St.",
        city: "Pomona, ",
        state: "CA 91766",
        customerType: "Manufacturer",
        phone: "(562) 946-1796",
        fax: "(626) 454-1602"
      },
      {
        key: 8,
        firstName: "Academy",
        displayName: "Academy Doors",
        billingAddress: "555 Maitland Ave",
        city: "Ontario, ",
        state: "CA 91761",
        customerType: "Manufacturer",
        phone: "(562) 946-1796",
        fax: "(626) 454-1602"
      },
      {
        key: 9,
        firstName: "ACME",
        displayName: "ACME Home Elevator",
        billingAddress: "4740 E. 2nd Street, Suite 200",
        city: "Benicia, ",
        state: "CA 94510",
        customerType: "Subcontractor",
        phone: "(562) 946-1796",
        fax: "(626) 454-1602"
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
      <div id="customerListingTable">
        <Table
          rowKey="key"
          className="customerListingTable"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={customers}
          pagination={false}
          onRow={record => ({
            onClick: e => {
              this.props.history.push({
                pathname: "/customer-detail"
              });
            }
          })}
        />
      </div>
    );
  }
}
export default withRouter(CustomerListSection);
