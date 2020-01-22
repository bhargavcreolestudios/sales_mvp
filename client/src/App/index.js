import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'antd/dist/antd.css';
import routes from '../routes';
class App extends React.Component {
  render() {
  	return (
      <Router>
        {routes.map((route, index) => 
            <Route {...route} />
        )}
      </Router>
  	);
  }
}

export default App;
