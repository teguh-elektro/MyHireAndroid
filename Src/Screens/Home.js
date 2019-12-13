import Axios from 'axios'
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';
import { ActivityIndicator,    
  ScrollView } from 'react-native'
import {AsyncStorage} from 'react-native';
import SignIn from './Login'
import SignUp from './Regist'
import Profile from './Profile'
import Project from './Project'
import Logout from './Logout'
import { connect } from 'react-redux';
// Imports: Redux Actions
// Imports: Redux Actions
import { login } from '../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';
import { jwt } from '../../redux/actions/tokenAction'
import { getEngineer } from '../../redux/actions/engineerActions'
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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          isLoading: true,
          username: '',
          password: '',
          category: '0'
        };
      }

      componentDidMount(){
          this.getData()
      }

    getData = async () => {
        try {
            const result = await Axios.get('http://18.233.99.1:3000/engineer/read')
            this.setState({data: result.data, isLoading: false})
        } catch (error) {
            console.log(error);
        }
    }

    _setIdEngineer = async (id) => {
      await this.props.reduxEngineer(id);
      await console.log(this.props.id);
      this.props.navigation.navigate('Review')
    }

    render() {

        const {data, isLoading} = this.state;

        
        if(isLoading){
            return(
                <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#e74c3c' />
            )
        }  
      return (
        <Container>
        <Header searchBar rounded
                autoCorrect={false}>
            <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
                    <Icon name="ios-people" />
            </Item>
            <Button transparent>
                <Text>Search</Text>
            </Button>
        </Header>        
        <Content>
        
        {
            data.map(product => (
            <Card style={{flex: 0}} >
                <CardItem button onPress={() => {this._setIdEngineer(product.created_by)}}>
                <Body>
                    <Image 
                        source={{uri: `http://18.233.99.1:3000/myhire/file/${product.photo}`}} 
                        style={{height: 240, width: 240, flex: 1}}
                        
                    />
                    <Text>
                    {product.name}
                    </Text>
                    <Text>
                    skill:
                    {product.skill}
                    </Text>
                </Body>
                </CardItem>
                <CardItem>
                <Left>
                    <Button transparent textStyle={{color: '#87838B'}}>
                    <Icon name="logo-github" /> 
                    <Text>{product.project}</Text>
                    </Button>
                </Left>
                <Right>
                <Button transparent textStyle={{color: '#87838B'}}>
                    <Icon name="logo-github" /> 
                    <Text>{product.done}</Text>
                    </Button>
                </Right>
                </CardItem>
            </Card>
            ))  
    } 
        
        </Content>
        
        
        {
          (!this.props.loggedIn)?
          <Footer>
            <FooterTab>
              <Button full onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text>Login</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button full onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text>Sign Up</Text>
              </Button>
            </FooterTab>
          </Footer>
          :
          <Footer>
            <FooterTab>
              <Button 
                full 
                onPress={() => this.props.navigation.navigate('Profile')} 
              >
                <Icon name="person" />
                <Text>Profile</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button full 
                onPress={() => this.props.navigation.navigate('ProjectList')}
                badge vertical 
              >
              <Badge><Text>2</Text></Badge>
                <Icon name="apps" />
                <Text>Project</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button full 
                onPress={() => this.props.navigation.navigate('Logout')}
              >
                <Icon name="apps" />
                <Text>Log out</Text>
              </Button>
            </FooterTab>
          </Footer>
        }
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
//         headerMode: 'none',
//       initialRouteName: 'SignIn',
//     }
//   );
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      counter: state.counterReducer.counter,
      loggedIn: state.authReducer.loggedIn,
      token: state.tokenReducer.token,
      id: state.engineerReducer.id
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
  
        reduxEngineer: (id) => dispatch(getEngineer(id))
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(Home)