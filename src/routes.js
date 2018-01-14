import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from './views/homeView';

class Routes extends Component {
  render() {
    return(
      <Router>
        <Route
          path="/"
          exact
          render={(...renderProps) => (
            <HomeView {...renderProps} {...this.props} />
          )}
        />
      </Router>
    );
  }
}

export default Routes;