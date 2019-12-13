import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import LoginNavigation from './LoginNavigation';
import MainNavigation from './MainNavigation';
import RootNavigation from './RootNavigation';

class AppWithState extends Component {
    render() {
        const { navigationState, dispatch } = this.props;
        const addListener = createReduxBoundAddListener("root");

        return <RootNavigation />

    }
}

const mapStateToProps = (state) => {
    return {
        navigationState: state.nav,
        login: state.login
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      counter: state.counterReducer.counter,
      loggedIn: state.authReducer.loggedIn,
    };
  };
  
  // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
  const mapDispatchToProps = (dispatch) => {
    // Action
      return {
        // Increase Counter
        reduxIncreaseCounter: () => dispatch(increaseCounter()),
        // Decrease Counter
        reduxDecreaseCounter: () => dispatch(decreaseCounter()),
        // Login
        reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
     };
  };

  
export default connect(mapStateToProps)(AppWithState);