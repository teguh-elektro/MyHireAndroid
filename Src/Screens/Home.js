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
import { role } from '../../redux/actions/categoryAction'
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
          search: ''
        };
      }

      componentDidMount(){
        // if(this.props.loggedIn) 
          this.getData()
      }

    getData = async () => {
        try {
            const result = await Axios.get(`http://192.168.1.16:3000/engineer/read`)
            console.log(result.data.result);
            
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

    searchSkill = async()=> {
      try {
          const search = this.state.search
          console.log(search);
          
          const result = await Axios.get(`http://192.168.1.16:3000/myhire/search/?skill=${search}`)
          console.log(result.data.result);
          this.setState({data: result.data.result, isLoading: false})
      } catch (error) {
          console.log(error);
      }
    }

    render() {

        const {data, isLoading} = this.state;
        console.log(this.props.category);
        
        
        if(isLoading){
            return(
                <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#e74c3c' />
            )
        }  
      return (
        <Container>
        <Header searchBar rounded
                autoCorrect={false}>
           
           {
             (this.props.loggedIn)&&
             <Item style={{left:20}}>
                <Icon name="ios-search" />
                <Input placeholder="Search" 
                  onChangeText={value => this.setState({search: value})}
                />
            </Item>
           }
           {
             
             (this.props.loggedIn)&&
             <Left style={{left:20}}>
               <Button
                onPress = {()=>this.searchSkill()}
               >
                  <Text>Go</Text>
                </Button>
             </Left>
             
           }
            
        </Header>        
        <Content>
        
        {
            data.map((product, index) => (
            <Card style={{flex: 0, justifyContent :'center', width : 260, left : 30}} key={index}>
                <CardItem button onPress={() => {(this.props.category)&&this._setIdEngineer(product.created_by)}}>
                <Body>
                    
                    <Image 
                        source={{uri: `http://192.168.1.16:3000/myhire/file/${product.photo}`}} 
                        style={{height: 240, width: 240, flex: 1, right : 8, borderRadius  : 10}}
                        
                    />
                    <View style={{ alignItems : 'center', flex : 0, left : 70}}>
                      <Text style={{justifyContent : 'center'}}> 
                        {product.name}
                      </Text>
                      <Text
                        style={{
                          fontSize:16,
                          color: "#3F51B5",
                          marginTop:10
                        }}
                      >
                        {product.skill}
                      </Text>
                    </View>
                </Body>
                </CardItem>
                <CardItem style={{flex: 1}}>
                  <Icon name="settings" 
                        style={{
                          color: "#3F51B5"
                  }}/> 
                  <Text>{(product.project)?product.project:'0'}</Text>
                  <Right/>
                  <Icon name="pie" 
                        style={{
                          color: "#3F51B5"
                  }}/> 
                  <Text>{(product.done)?(product.done/product.project*100):'0'}%</Text>
                {/* <Left>
                    <Icon name="logo-github" 
                      style={{
                        fontSize:16,
                        color: "#3F51B5",
                        marginTop:10
                    }}/> 
                    <Text>Project:{product.project}</Text>
                </Left>
                <Right>
                    <Icon name="alarm" 
                      style={{
                        fontSize:16,
                        color: "#3F51B5",
                        marginTop:10
                    }}/> 
                    <Text>Rate:{product.done}</Text>
                </Right> */}
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
                onPress={() =>{
                  (this.props.category)?
                  this.props.navigation.navigate('ProjectList'):
                  this.props.navigation.navigate('EngineerProject');
                 } 
                }
                badge vertical 
              >
              <Badge><Text>2</Text></Badge>
                <Icon name="settings" />
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
  
        reduxEngineer: (id) => dispatch(getEngineer(id)),
        reduxCategory: (category) => dispatch(role(category)),
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(Home)