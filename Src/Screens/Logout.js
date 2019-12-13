import Axios from 'axios'
// Imports: Redux Actions
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';
import { jwt } from '../../redux/actions/tokenAction'
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';
import { ActivityIndicator,    
  ScrollView } from 'react-native'
import {AsyncStorage} from 'react-native';

import { 
    Container, 
    Header, 
    Content, 
    Form, 
    Item, 
    Input, 
    Label, 
    Left, 
    Body, 
    Right, 
    Title, 
    Button, 
    Text,
    View,
    Picker,
    Icon,
    Footer, 
    FooterTab,
    Card, 
    CardItem, 
    Accordion,
    Badge 
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { from } from 'rxjs';
 

  class Logout extends React.Component {
    
    _sendLogout = async () => {
        isLogin = 0; 
        console.log(this.props.token);
        
        try{
            Axios.defaults.headers.common['Authorization'] = this.props.token;
            await Axios.get('http://18.233.99.1:3000/myhire/logout')
            Axios.defaults.headers.common['Authorization'] = '0';
            await this.props.reduxLogin(false)
            await this.props.navigation.navigate('Signin')
        }catch(error){
          await this.props.navigation.navigate('Signin')
            console.log(error);
        }
    }

    render(){
      return(
        <Container>
           <Button 
                onPress={() => {this._sendLogout()}}
                style={{margin: 15, borderRadius: 10}} 
                // onPress={this.props.loggedIn === false ? () => this.props.reduxLogin(true) : () => this.props.reduxLogin(false)}
            ></Button>
        </Container>
      )
    }
  } 

//   const AppNavigator = createStackNavigator(
//     {
//       Home: Home,
//       SignUp: SignUp,
//       SignIn: SignIn,
//       Profile: Profile,
//       Project: Project  
//     },
//     {
//       initialRouteName: 'Home',
//     }
//   );

  // Exports
// export default SignIn

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    counter: state.counterReducer.counter,
    loggedIn: state.authReducer.loggedIn,
    token: state.tokenReducer.token,
    engineerList: state
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

      reduxToken: (token) => dispatch(jwt(token)),

      reduxEngineer: () => dispatch(getEngineer())
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Logout);