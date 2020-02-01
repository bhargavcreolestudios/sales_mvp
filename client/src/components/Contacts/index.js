import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Select, Table, Modal } from "antd";

import NewContact from "../NewContact";

import iconFilter from "../../assets/iconFilter.png";
import newCustomer from "../../assets/newCustomer.png";
import iconMore from "../../assets/iconMore.png";
import "./index.css";

const { Option } = Select;
class Contacts extends React.Component {
  state = {
    isOpen: false,
    isEditModal: false
  };
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
    });
  };
  handleEditSubmit = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  saveEditFormRef = formRef => {
    this.formRef = formRef;
  };
  handleRowClick = (record, index) => {
    console.log(record, "record");
    this.setState({ isEditModal: true });
  };
  render() {
    const { isOpen, isEditModal } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <div className="nameWrapper">
            <div className="customTD fullNameWrapper">
              <p className="name">
                <Link to="/customer-detail" style={{ color: "#004881" }}>
                  {text}
                </Link>
              </p>
              <p className="content">{record.fullName}</p>
            </div>
            <div className="iconMoreWrapper">
              <img src={iconMore} />
            </div>
          </div>
        )
      },
      {
        title: "Title / Position",
        dataIndex: "titlePosition",
        render: (text, record) => (
          <div className="customTD">
            <p className="content">{text}</p>
          </div>
        )
      },
      {
        title: "E-Mail",
        dataIndex: "email",
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: "Extension",
        dataIndex: "extension",
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: "Mobile No.",
        dataIndex: "mobileno",
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: "Other No.",
        dataIndex: "otherno",
        render: text => <p className="content otherContent">{text}</p>
      }
    ];
    const data = [
      {
        key: 1,
        name: "Bill Epson",
        titlePosition: "President",
        email: "bill.epson@agsales.com",
        extension: "100",
        mobileno: "(562) 803-1888",
        otherno: "(562) 555-6523"
      },
      {
        key: 2,
        name: "John Doe",
        titlePosition: "VP of Sales",
        email: "john.doe@agsales.com",
        extension: "120",
        mobileno: "(866) 537-2263",
        otherno: ""
      },
      {
        key: 3,
        name: "Mark Bridges",
        titlePosition: "Field User",
        email: "Mark@agsales.com",
        extension: "212",
        mobileno: "(866) 796-4283",
        otherno: "(866) 796-4283"
      },
      {
        key: 4,
        name: "Ashley Houk",
        titlePosition: "Supervisor",
        email: "ashley@agsales.com",
        extension: "112",
        mobileno: "(909) 391-7024",
        otherno: "(866) 796-4283"
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
    };
    return (
      <div>
        <div className="addNewSection">
          <Select defaultValue="All" style={{ width: 80 }}>
            <Option value="jack">Jack</Option>
            <Option value="All">All (4)</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <span className="separator" />
          <div
            onClick={() => this.setState({ isOpen: !isOpen })}
            className="newCustomer"
          >
            <img src={newCustomer} />
            New Contact
          </div>
        </div>
        <div className="filterSection">
          <Row>
            <Col span={22}>
              <div className="filterIcon">
                <img src={iconFilter} />
                <p>Filter by Keyword</p>
              </div>
            </Col>
            <Col span={2}>
              <div className="filterOptions">
                <div>
                  <Select
                    style={{ width: 90 }}
                    placeholder="Status"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Miner Los Angeles">Miner Los Angeles</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            onRow={(record, index) => {
              return {
                onClick: () => this.handleRowClick(record, index)
              };
            }}
            dataSource={data}
            pagination={false}
          />
          {/* Create Modal */}
          <Modal
            className="newContact"
            getContainer={() => document.getElementById("modal-wrapper")}
            title="New Contact"
            visible={isOpen}
            onOk={() => this.setState({ isOpen: false })}
            onCancel={() => this.setState({ isOpen: false })}
            footer={null}
          >
            <NewContact
              wrappedComponentRef={this.saveFormRef}
              visible={isOpen}
              onCancel={() => this.setState({ isOpen: false })}
              onCreate={this.handleCreate}
            />
          </Modal>
          {/* Edit Modal */}
          <Modal
            className="newContact"
            getContainer={() => document.getElementById("modal-wrapper")}
            title="New Contact"
            visible={isEditModal}
            onOk={() => this.setState({ isEditModal: false })}
            onCancel={() => this.setState({ isEditModal: false })}
            footer={null}
          >
            <NewContact
              wrappedComponentRef={this.saveEditFormRef}
              visible={isEditModal}
              isEdit={true}
              onCancel={() => this.setState({ isEditModal: false })}
              onCreate={this.handleEditSubmit}
            />
          </Modal>
        </div>
      </div>
    );
  }
}
export default Contacts;
