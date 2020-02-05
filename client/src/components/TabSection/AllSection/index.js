import React from "react";
import FilterSection from "../../FilterSection";
import CustomerListSection from "../../CustomerListSection";
import "./index.css";
class AllSection extends React.Component {
  render() {
    return (
      <div className="AllSectionWrapper" id="AllSectionWrapper">
        {/* <FilterSection /> */}
        <CustomerListSection customers={this.props.customers} noData={this.props.noData} />
      </div>
    );
  }
}

export default AllSection;
