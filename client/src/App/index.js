import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./customStyle.css";
import routes from "../routes";
class App extends React.Component {
  render() {
    return (
      <Router>
        {routes.map((route, index) => (
          <Route {...route} key={index} />
        ))}
      </Router>
    );
  }
}

export default App;
