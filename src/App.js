import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from './redux/user/user.action';

// Switch -> when match one above, do not match others.
// exact -> should exact match
const App = ({ checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);


  return (<div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage}></Route>
      <Route path="/shop" component={ShopPage}></Route>
      <Route exact path="/checkout" component={CheckoutPage}></Route>
      <Route path="/sign-in" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}></Route>
    </Switch>
  </div>);
};

// pass the currentUser from rootState.user(reducer)
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
}); // collectionsArray: selectCollectionsForPreview

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
