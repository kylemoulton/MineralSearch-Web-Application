import React, { Component } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Footer from './Footer';
import MineralSearchForm from './MineralSearchForm';
import '../stylesheets/MainApp.css';

class App extends Component {
  render() {
    return (
      <div id="subRoot">
        <Header />
          <div id="mainContent">
            <MineralSearchForm />
          </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(App);
