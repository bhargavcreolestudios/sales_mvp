import React from "react";
import { Row, Col, Select, Input,Divider,Icon,Button } from "antd";
import iconExpand from "../../assets/expand.svg";
import iconFilter from "../../assets/icoSFilter.svg";
import iconClose from "../../assets/close.svg";
import "./index.css";
import services from "../../services/customerService";
const { Option } = Select;
class FilterSection extends React.Component {
  state = {
    locations: [],
    accountRepresentatives: [],
    customerTypes: [],
    currentSelect: {},
    divisions: ["Commercial", "Gates", "Residential"],
    status: [
      "Inactive",
      "Past Due",
      "Credit Hold",
      "PO Required",
      "Bad Standing"
    ],
    filter: {
      search: "",
      location: [],
      division: [],
      accountRepresentative: [],
      customerType: [],
      status: []
    }
  };
  async componentDidMount() {
    let locations = await services.getLocations();
    let accountRepresentatives = await services.getAccountRepresentatives();
    let customerTypes = await services.getCustomerTypes();
    this.setState({
      locations: locations,
      accountRepresentatives: accountRepresentatives,
      customerTypes: customerTypes
    });
  }
  filterData = () => {
    let { filter } = this.state;
    let { customers } = this.props;
    if (filter.search.length > 3) {
      let searchData = [];
      customers.filter(data => {
        for (let [key, value] of Object.entries(data)) {
          if (
            value
              .toString()
              .toLowerCase()
              .includes(filter.search.toString().toLowerCase())
          )
            searchData.push(data);
        }
        customers = searchData;
      });
    }
    if (filter.location.length > 0) {
      customers = customers.filter(data => {
        return filter.location.includes(data.state);
      });
    }
    if (filter.division.length > 0) {
      // customers = customers.filter(data => {
      //   return filter.division.includes(data.state);
      // });
    }
    if (filter.accountRepresentative.length > 0) {
      customers = customers.filter(data => {
        return filter.accountRepresentative.includes(data.accountRep);
      });
    }
    if (filter.customerType.length > 0) {
      customers = customers.filter(data => {
        return filter.customerType.includes(data.customerType);
      });
    }
    if (filter.status.length > 0) {
      // customers = customers.filter(data => {
      //   return filter.status.includes(data.state);
      // });
    }
    this.props.filter(customers);
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

  handleLocationSelectVisible = (open, key) => {
    let { currentSelect } = this.state;
      currentSelect.location = open;
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open);
  }

   handleDivisionSelectVisible = (open, key) => {
    let { currentSelect } = this.state;
      currentSelect.division = open;
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open);
  }

  handleTypeSelectVisible = (open, key) => {
    let { currentSelect } = this.state;
      currentSelect.customerType = open;
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open);
  }
  handleAccountSelectVisible = (open, key) => {
    let { currentSelect } = this.state;
      currentSelect.accountRepresentative = open;
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open);
  }
  handleStatusSelectVisible = (open, key) => {
    let { currentSelect } = this.state;
      currentSelect.status = open;
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open);
  }

 /* handleSelectVisible = (open, key) => {
    let { currentSelect } = this.state;
    if(key === 'location') {
      currentSelect.location = open;
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open, 'location');
    }
    else if(key === 'division') {
      currentSelect.division = open
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open, 'division');
    }
    else if(key === 'accountRepresentative') {
      currentSelect.accountRepresentative = open
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open, 'accountRepresentative');
    }
    else if(key === 'customerType') {
      currentSelect.customerType = open
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open, 'customerType');
    }
    else if (key === 'status') {
      currentSelect.status = open
      this.setState({
        currentSelect
      })
      this.props.parentSelect(open, 'status');
    }
  }*/
  render() {
    let {
      locations,
      divisions,
      filter,
      accountRepresentatives,
      currentSelect,
      customerTypes,
      status
    } = this.state;
    return (
      <div className="filterSection" id="filterSection">
        <Row>
          <Col span={6}>
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
          <Col span={18}>
            <div className="filterOptions">
              <div className={`selectlocation ${currentSelect.location ? 'open-dd': ''} ${filter.location.length > 0 ? 'dropdown-open': ''}`} id="selectlocation">
               {filter.location.length > 0  && <label style={{ color: "#707070" }}>Location:</label>}
                <Select
                  onChange={this.selectAction.bind(this, "location")}
                  getPopupContainer={() =>
                     document.getElementById("selectlocation")
                   }
                   onDropdownVisibleChange={(open) => this.handleLocationSelectVisible(open, 'location')}
                   dropdownRender={menu => (
                  <div>
                    {menu}
                    <div className="dropdownfooter">
                    <img src={iconClose} />
                    <Button className="close">Clear</Button>
                      </div>
                  </div>
                )}
                  mode="multiple"
                  style={{ width: 115 }}
                  placeholder="Location"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {locations.map(location => {
                    return (
                      <Option key={location._id} value={location.location}>
                        {location.location}
                      </Option>
                    );
                  })}
                </Select>
                <img className="expandicon" src={iconExpand} />
              </div>
              <div className={`selectlocation ${currentSelect.division ? 'open-dd': ''} ${filter.division.length > 0 ? 'dropdown-open': ''}`} id="divisionlocation">
              {filter.division.length > 0  && <label style={{ color: "#707070" }}>Division:</label>}
                <Select
                    onChange={this.selectAction.bind(this, "division")}
                    getPopupContainer={() =>
                       document.getElementById("divisionlocation")
                     }
                     
                     onDropdownVisibleChange={(open) => this.handleDivisionSelectVisible(open, 'division')}
                     dropdownRender={menu => (
                    <div>
                      {menu}
                      <div className="dropdownfooter">
                      <img src={iconClose} />
                      <Button className="close">Clear</Button>
                        </div>
                    </div>
                  )}
                    mode="multiple"
                    style={{ width: 110 }}
                    placeholder="Division"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                   {divisions.map(division => {
                      return (
                        <Option key={division} value={division}>
                          {division}
                        </Option>
                      );
                    })}
                  </Select>
                  <img className="expandicon" src={iconExpand} />
               
              </div>
              <div className={`selectlocation ${currentSelect.accountRepresentative ? 'open-dd': ''} ${filter.accountRepresentative.length > 0 ? 'dropdown-open': ''}`} id="accountRepresentativelocation">
              {filter.accountRepresentative.length > 0  && <label style={{ color: "#707070" }}>Account Rep:</label>}
                <Select
                      onChange={this.selectAction.bind(this, "accountRepresentative")}
                      getPopupContainer={() =>
                         document.getElementById("accountRepresentativelocation")
                       }
                       onDropdownVisibleChange={(open) => this.handleAccountSelectVisible(open, 'accountRepresentative')}
                       dropdownRender={menu => (
                      <div>
                        {menu}
                        <div className="dropdownfooter">
                        <img src={iconClose} />
                        <Button className="close">Clear</Button>
                          </div>
                      </div>
                    )}
                      mode="multiple"
                      style={{ width: 140 }}
                      placeholder="Account Rep"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                    {accountRepresentatives.map(accountRepresentative => {
                    return (
                      <Option
                        key={accountRepresentative._id}
                        value={accountRepresentative.name}
                      >
                        {accountRepresentative.name}
                      </Option>
                    );
                  })}
                    </Select>
                    <img className="expandicon" src={iconExpand} />
            
                  
              </div>
              <div className={`selectlocation ${currentSelect.customerType ? 'open-dd': ''} ${filter.customerType.length > 0 ? 'dropdown-open': ''}`} id="customertypelocation">
              {filter.customerType.length > 0  && <label style={{ color: "#707070" }}>Type:</label>}
                  <Select
                      onChange={this.selectAction.bind(this, "customerType")}
                      getPopupContainer={() =>
                         document.getElementById("customertypelocation")
                       }
                       onDropdownVisibleChange={(open) => this.handleTypeSelectVisible(open, 'customerType')}
                       dropdownRender={menu => (
                      <div>
                        {menu}
                        <div className="dropdownfooter">
                        <img src={iconClose} />
                        <Button className="close">Clear</Button>
                          </div>
                      </div>
                    )}
                      mode="multiple"
                      style={{ width: 95 }}
                      placeholder="Type"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                     {customerTypes.map(division => {
                        return (
                          <Option key={division._id} value={division.type}>
                            {division.type}
                          </Option>
                        );
                      })}
                    </Select>
                    <img className="expandicon" src={iconExpand} />
                
              </div>
              <div className={`selectlocation ${currentSelect.status ? 'open-dd': ''} ${filter.status.length > 0 ? 'dropdown-open': ''}`} id="statuslocation">
              {filter.status.length > 0  && <label style={{ color: "#707070" }}>Status:</label>}
                  <Select
                      onChange={this.selectAction.bind(this, "status")}
                      getPopupContainer={() =>
                         document.getElementById("statuslocation")
                       }
                       onDropdownVisibleChange={(open) => this.handleStatusSelectVisible(open, 'status')}
                       dropdownRender={menu => (
                      <div>
                        {menu}
                        <div className="dropdownfooter">
                        <img src={iconClose} />
                        <Button className="close">Clear</Button>
                          </div>
                      </div>
                    )}
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
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default FilterSection;
