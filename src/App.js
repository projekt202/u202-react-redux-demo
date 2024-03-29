import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SearchPage from './SearchPage.js';
import MovieDetails from './MovieDetails.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <div className="container">
            <Route exact path="/" component={SearchPage}/>
            <Route path="/movie/:id" component={MovieDetails}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
