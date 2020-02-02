import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Select, Table, Modal } from 'antd';

import NewContact from '../NewContact';
import services from '../../services/customerService';
import iconFilter from '../../assets/iconFilter.png';
import newCustomer from '../../assets/newCustomer.png';
import iconMore from '../../assets/iconMore.png';
import './index.css';

const { Option } = Select;
class Contacts extends React.Component {
  state = {
    isOpen: false,
    contacts: [],
    isEditModal: false
  };
  async componentDidMount() {
    let res = await services.getContacts(this.props.match.params.id);
    this.setState({
      contacts: res.contacts
    });
  }
  handleCreate = e => {
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await services.createContact(
        this.props.match.params.id,
        values
      );
      let resGet = await services.getContacts(this.props.match.params.id);
      this.setState({
        contacts: resGet.contacts,
        isOpen: false
      });
      form.resetFields();
    });
  };
  handleEditSubmit = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await services.updateContact(
        this.props.match.params.id,
        values
      );
      console.log('Received values of form: ', values);
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
    console.log(record, 'record');
    this.setState({ isEditModal: true });
  };
  render() {
    const { isOpen, isEditModal, contacts } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => (
          <div className="nameWrapper">
            <div className="customTD fullNameWrapper">
              <p className="name">
                <Link to="/customer-detail" style={{ color: '#004881' }}>
                  {record.firstName}
                </Link>
              </p>
              <p className="content">{record.lastName}</p>
            </div>
            <div className="iconMoreWrapper">
              <img src={iconMore} />
            </div>
          </div>
        )
      },
      {
        title: 'Title / Position',
        dataIndex: 'titlePosition',
        render: (text, record) => (
          <div className="customTD">
            <p className="content">{record.position}</p>
          </div>
        )
      },
      {
        title: 'E-Mail',
        dataIndex: 'email',
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: 'Extension',
        dataIndex: 'extension',
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: 'Mobile No.',
        dataIndex: 'mobile',
        render: text => <p className="content otherContent">{text}</p>
      },
      {
        title: 'Other No.',
        dataIndex: 'officeNumber',
        render: text => <p className="content otherContent">{text}</p>
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
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
            rowKey={record => record._id}
            dataSource={contacts}
            pagination={false}
          />
          {/* Create Modal */}
          <Modal
            className="newContact"
            getContainer={() => document.getElementById('modal-wrapper')}
            title="New Contact"
            visible={isOpen}
            onOk={() => this.setState({ isOpen: false })}
            onCancel={() => this.setState({ isOpen: false })}
            destroyOnClose={true}
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
            getContainer={() => document.getElementById('modal-wrapper')}
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
              destroyOnClose={true}
              onCancel={() => this.setState({ isEditModal: false })}
              onCreate={this.handleEditSubmit}
            />
          </Modal>
        </div>
      </div>
    );
  }
}
export default withRouter(Contacts);
