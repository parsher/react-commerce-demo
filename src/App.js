import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument} from './firebase/firebase.utils'; //, addCollectionAndDocuments 
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from "./redux/user/user.selector";
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';

// Switch -> when match one above, do not match others.
// exact -> should exact match
class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;
    // listen on the auth change
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // listen on the snapshot change
        userRef.onSnapshot(snapShot => {
          setCurrentUser(
            {
              id: snapShot.id,
              ...snapShot.data()
            }
          );
        }, () => {
          // console.log(this.state);
        });
      }
      setCurrentUser(userAuth);
      // for saving collections data for one time.
      // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (<div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/shop" component={ShopPage}></Route>
        <Route exact path="/checkout" component={CheckoutPage}></Route>
        <Route path="/sign-in" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}></Route>
      </Switch>
    </div>);
  }
}

// pass the currentUser from rootState.user(reducer)
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
}); // collectionsArray: selectCollectionsForPreview

// mapping method setCurrentUser to the App class
// setCurrentUser => get action object
// dispatch the action object
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
