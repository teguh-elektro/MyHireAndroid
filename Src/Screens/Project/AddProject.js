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
import { Col, Row, Grid } from 'react-native-easy-grid';

let isLogin = 0;  

  class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state={
            name: '',
            skill: '',
            description: '',
            id_engineer: '',
            done: '',
            budget: ''
        }
    }
    _sendProject = async () => {
        isLogin = 0; 
        try{
          const auth = await Axios.post('http://18.233.99.1:3000/myhire/createproject',
              {
                    name: this.state.name,
                    skill: this.state.skill,
                    description: this.state.description,
                    budget: this.state.budget
              }
          )
          await this.props.navigation.navigate('ProjectList')
        }catch(error){
            console.log(error);

        }
    }

    render() {
      return (
        <Container>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel style={{margin: 15}}>
              <Label>Name Project:</Label>
              <Input 
                onChangeText={value => this.setState({name: value})}
              />
            </Item>
            <Item stackedLabel style={{margin: 15}}>
              <Label>Skill:</Label>
              <Input 
                onChangeText={value => this.setState({skill: value})}
              />
            </Item>
            <Item stackedLabel style={{margin: 15}}>
              <Label>Budget:</Label>
              <Input 
                onChangeText={value => this.setState({budget: value})}
              />
            </Item>
            <Item stackedLabel style={{margin: 15}}>
              <Label>Description:</Label>
              <Input 
                onChangeText={value => this.setState({description: value})}
              />
            </Item>
            <Button 
                style={{margin: 15, borderRadius: 10}} 
                onPress={()=>{this._sendProject()}}
            >
              <Left/>
                <Text>
                  ADD
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