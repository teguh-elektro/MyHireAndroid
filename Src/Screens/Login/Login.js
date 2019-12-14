import Axios from 'axios'
// Imports: Redux Actions
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';
import { getEngineer } from '../../redux/actions/engineerActions'
import { jwt } from '../../redux/actions/tokenAction'
import { role } from '../../redux/actions/categoryAction'
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

let isLogin = 0;  

  class SignIn extends React.Component {
    
    _sendLogin = async () => {
        isLogin = 0; 
        try{
            
          const auth = await Axios.post('http://18.233.99.1:3000/myhire/login',
              {
                  username: this.state.username,
                  password: this.state.password
              }
          )
              await console.log(this.props.token);
            Axios.defaults.headers.common['Authorization'] = auth.data.result.token;
             await this.props.reduxLogin(true)
             await this.props.reduxCategory(auth.data.result.category)
             await this.props.reduxToken(auth.data.result.token)
              await this.props.navigation.navigate('Home')
        }catch(error){
            console.log(error);

        }
    }

    


    render() {
      return (
        <Container>
        <Header >
          <Left/>
            <Body>
              <Title>MyHire App</Title>
            </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel style={{margin: 15}}>
              <Label>Username</Label>
              <Input 
                onChangeText={value => this.setState({username: value})}
              />
            </Item>
            <Item floatingLabel style={{margin: 15}}>
              <Label>Password</Label>
              <Input 
                secureTextEntry={true}
                onChangeText={value => this.setState({password: value})}
              />
            </Item>
            <Button 
                onPress={() => {this._sendLogin()}}
                style={{margin: 15, borderRadius: 10}} 
                onPress={() => this._sendLogin()}
                // onPress={this.props.loggedIn === false ? () => this.props.reduxLogin(true) : () => this.props.reduxLogin(false)}
            >
              <Left/>
                <Text>
                  Login
                </Text>
              <Right />
            </Button> 
            <Button 
            style={{margin: 15, borderRadius: 10}} 
            onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <Left/>
                <Text>
                  Sign Up
                </Text>
              <Right />
            </Button>
          </Form>
        </Content>
      </Container>
      );
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
      id: state.engineerReducer.id,
      category: state.categoryReducer.category
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
  
        reduxEngineer: () => dispatch(getEngineer()),

        reduxCategory: (category) => dispatch(role(category)),
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(SignIn);