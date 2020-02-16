import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

// Switch -> when match one above, do not match others.
// exact -> should exact match
class App extends Component {
  render() {
    return (<div>
      <Switch> 
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/shop" component={ShopPage}></Route>
      </Switch>
    </div>);
  }
}

export default App;
