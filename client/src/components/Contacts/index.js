import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Select, Table, Modal, Input, Button } from 'antd';
import NewContact from '../NewContact';
import services from '../../services/customerService';
import iconFilter from '../../assets/icoSFilter.svg';
import newCustomer from '../../assets/icoAdd1.svg';
import iconMore from '../../assets/icoMoreo.svg';
import iconClose from '../../assets/close.svg';
import iconExpand from '../../assets/expand.svg';
import './index.css';

const { Option } = Select;
class Contacts extends React.Component {
  state = {
    isOpen: false,
    contacts: [],
    showData: [],
    rowSelect: null,
    currentSelect: null,
    isEditModal: false,
    status: [
      'Inactive',
      'Past Due',
      'Credit Hold',
      'PO Required',
      'Bad Standing'
    ],
    filter: {
      search: '',
      status: []
    },
    editContact: {}
  };
  async componentDidMount() {
    let res = await services.getContacts(this.props.match.params.id);
    this.setState({
      contacts: res.contacts || [],
      showData: res.contacts
    });
  }
  handleSelectVisible = (open, key) => {
    this.setState({
      currentSelect: open
    });
  };
  handleCreate = e => {
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await services.createContact(this.props.match.params.id, values);
      let resGet = await services.getContacts(this.props.match.params.id);
      this.setState({
        contacts: resGet.contacts,
        showData: resGet.contacts,
        isOpen: false
      });
      form.resetFields();
    });
  };
  handleEditSubmit = e => {
    e.preventDefault();
    const { form } = this.formEditRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await services.updateContact(this.state.editContact._id, values);
      let resGet = await services.getContacts(this.props.match.params.id);
      this.setState({
        contacts: resGet.contacts,
        showData: resGet.contacts,
        editId: '',
        isEditModal: false
      });
      form.resetFields();
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  saveEditFormRef = formRef => {
    this.formEditRef = formRef;
  };
  handleRowClick = (record, index) => {
    this.setState({
      isEditModal: true,
      editContact: record,
      rowSelect: record._id
    });
  };
  filterData = () => {
    let { filter, contacts } = this.state;
    let dataSource = [];
    if (contacts.length > 0) {
      Object.keys(contacts).map((component, index) => {
        return dataSource.push(contacts[component]);
      });
      contacts = dataSource;
      if (filter.search.length >= 1) {
        let searchData = [];
        contacts.filter(data => {
          for (let [key, value] of Object.entries(data)) {
            if (
              typeof value !== undefined &&
              value !== null &&
              value
                .toString()
                .toLowerCase()
                .includes(filter.search.toString().toLowerCase())
            ) {
              if (!searchData.filter(ele => ele._id === data._id).length > 0) {
                searchData.push(data);
              }
            }
          }
          contacts = searchData;
        });
      }
      if (filter.status.length > 0) {
        // contacts = contacts.filter(data => {
        //   return filter.status.includes(data.state);
        // });
      }
    }
    this.setState({ showData: contacts });
  };
  handleFilterClear = () => {
    let { filter } = this.state;
    filter['status'] = [];
    this.setState({
      filter
    });
  };
  selectAction = (key, value) => {
    let { filter } = this.state;
    filter[key] = value;
    this.setState({ filter }, () => {
      this.filterData();
    });
  };
  searchChanged = e => {
    let { filter } = this.state;
    let value = e.target.value;
    filter.search = value;
    this.setState({ filter }, () => {
      this.filterData();
    });
  };
  render() {
    const {
      isOpen,
      isEditModal,
      filter,
      currentSelect,
      contacts,
      status,
      showData,
      editContact
    } = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => (
          <div className="nameWrapper">
            <div className="customTD fullNameWrapper">
              <p className="name lineheight-normal">
                <a style={{ color: '#141823' }}>
                  {`${record.firstName} ${
                    record.lastName ? record.lastName : ''
                  }`}
                </a>
              </p>
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
            <p className="content">
              {record.position ? record.position : 'NA'}
            </p>
          </div>
        )
      },
      {
        title: 'E-Mail',
        dataIndex: 'email',
        render: (text, record) => (
          <p className="content otherContent">
            {record.email ? record.email : 'NA'}
          </p>
        )
      },
      {
        title: 'Extension',
        dataIndex: 'extension',
        render: (text, record) => (
          <p className="content otherContent">
            {record.extension ? record.extension : '0'}
          </p>
        )
      },
      {
        title: 'Mobile No.',
        dataIndex: 'mobile',
        render: (text, record) => (
          <p className="content otherContent">
            {record.mobile ? record.mobile : 'NA'}
          </p>
        )
      },
      {
        title: 'Other No.',
        dataIndex: 'officeNumber',
        render: (text, record) => (
          <p className="content otherContent">
            {record.officeNumber ? record.officeNumber : 'NA'}
          </p>
        )
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
      <div className="mainContactWrapper">
        <div className="addNewSection">
          <div className="contactfilter">
            <Select defaultValue="All" style={{ width: 80 }}>
              <Option value="jack">Jack</Option>
              <Option value="All">All (4)</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <img className="expandicon" src={iconExpand} />
          </div>
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
            <Col span={19}>
              <div className="filterIcon">
                <img src={iconFilter} />
                <Input
                  allowClear={true}
                  className="filterInputSearch"
                  placeholder="Filter by Keyword"
                  onChange={this.searchChanged.bind(this)}
                />
              </div>
            </Col>
            <Col span={5}>
              <div className="filterOptions">
                <div
                  className={`selectlocation ${
                    currentSelect === 'status' ? 'open-dd' : ''
                  } ${filter.status.length > 0 ? 'dropdown-open' : ''}`}
                  id="statuslocation"
                >
                  {filter.status.length > 0 && (
                    <label style={{ color: '#707070' }}>Status:</label>
                  )}
                  <Select
                    maxTagCount={1}
                    maxTagPlaceholder={() => (
                      <div>(+{filter.status.length - 1})</div>
                    )}
                    onChange={this.selectAction.bind(this, 'status')}
                    getPopupContainer={() =>
                      document.getElementById('statuslocation')
                    }
                    onDropdownVisibleChange={open =>
                      this.handleSelectVisible(open, 'status')
                    }
                    dropdownRender={menu => (
                      <div>
                        {menu}
                        <div className="dropdownfooter">
                          <div
                            className="closeSelectWrapper"
                            onClick={() => this.handleFilterClear()}
                          >
                            <img src={iconClose} />
                            <Button className="close">Clear</Button>
                          </div>
                        </div>
                      </div>
                    )}
                    value={filter.status ? filter.status : []}
                    mode="multiple"
                    style={{ width: 95 }}
                    placeholder="Status"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {status.map(status => {
                      return (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      );
                    })}
                  </Select>
                  <img className="expandicon" src={iconExpand} />
                </div>
                <div></div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={`${currentSelect ? 'overlay' : ''}`}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            onRow={(record, index) => {
              return {
                onClick: () => this.handleRowClick(record, index)
              };
            }}
            rowClassName={(record, index) => {
              if (this.state.rowSelect === record._id) {
                return 'row-select';
              }
            }}
            rowKey={record => record._id}
            dataSource={showData}
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
            onOk={() => this.setState({ isEditModal: false, rowSelect: null })}
            onCancel={() =>
              this.setState({ isEditModal: false, rowSelect: null })
            }
            footer={null}
          >
            <NewContact
              wrappedComponentRef={this.saveEditFormRef}
              visible={isEditModal}
              contactInfo={editContact}
              isEdit={true}
              destroyOnClose={true}
              onCancel={() =>
                this.setState({ isEditModal: false, rowSelect: null })
              }
              onCreate={this.handleEditSubmit}
            />
          </Modal>
        </div>
      </div>
    );
  }
}
export default withRouter(Contacts);
