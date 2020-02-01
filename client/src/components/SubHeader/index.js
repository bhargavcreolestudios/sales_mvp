import React from "react";
import { Tabs, Button } from "antd";
import "./index.css";
import newCustomer from "../../assets/icoAdd1.svg";
import customerTypes from "../../assets/icoCustType.svg";
import columnOptions from "../../assets/icoCSet.svg";
import importCustomers from "../../assets/icoImport.svg";
import recycle from "../../assets/icoTrash.svg";

const { TabPane } = Tabs;
class SubHeader extends React.Component {
  render() {
    const { defaultActiveKey, tabPane, className, mainSubHeader } = this.props;
    return (
      <div className={`SubHeaderWrapper ${className ? className : ""}`}>
        {mainSubHeader && (
          <div className="SubHeaderButtons">
            <div className="SubHeaderFirstButtons">
              <Button onClick={() => this.props.openModal()}>
                <img src={newCustomer} />
                New Customer
              </Button>
              <Button>
                <img src={customerTypes} />
                Customer Types
              </Button>
              <Button>
                <img src={columnOptions} />
                Column Options
              </Button>
              <Button>
                <img src={importCustomers} />
                Import Customers
              </Button>
              <Button>
                <img src={recycle} />
                Recycle
              </Button>
            </div>
          </div>
        )}
        <Tabs className="SubHeaderTabs" defaultActiveKey={defaultActiveKey}>
          {tabPane.map((tabpane, index) => (
            <TabPane tab={tabpane.tab} key={index}>
              {tabpane.component}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default SubHeader;
