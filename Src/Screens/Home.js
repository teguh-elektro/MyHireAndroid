import Axios from 'axios'
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';
import { ActivityIndicator,    
StyleSheet,
ScrollView,
TouchableOpacity ,
SafeAreaView } from 'react-native'
import {AsyncStorage} from 'react-native';
import SignIn from './Login'
import SignUp from './Regist'
import Profile from './Profile'
import Project from './Project'
import Logout from './Logout'
import { connect } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
// Imports: Redux Actions
// Imports: Redux Actions
import { login } from '../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';
import { jwt } from '../../redux/actions/tokenAction'
import { getEngineer } from '../../redux/actions/engineerActions'
import { role } from '../../redux/actions/categoryAction'
import Icon from 'react-native-vector-icons/FontAwesome5';
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
            const result = await Axios.get(`http://18.233.99.1:3000/engineer/read`)
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
          
          const result = await Axios.get(`http://18.233.99.1:3000/myhire/search/?skill=${search}`)
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
                <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#3F51B5' />
            )
        }  
      return (
        <Container>
        <Header searchBar rounded
                autoCorrect={false}>
           
           {
             (this.props.loggedIn)&&
             <Item style={{left:20}}>
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
                   <Icon name="search" style={{margin: 10, fontSize: 20, color: "white"}}/>
                </Button>
             </Left>
             
           }
            
        </Header>        
        {/* <Content>
        
        {
            data.map((product, index) => (
            <Card style={{flex: 0, justifyContent :'center', width:280}} key={index}>
                <CardItem button onPress={() => {(this.props.category)&&this._setIdEngineer(product.created_by)}}>
                <Body>
                    
                    <Image 
                        source={{uri: `http://18.233.99.1:3000/myhire/file/${product.photo}`}} 
                        style={{height: 240, width: 240,margin:2, borderRadius  : 10, alignItems : 'center'}}
                        
                    />
                    <View style={{ alignItems : 'center', flex : 0, left : 50}}>
                      <Text 
                        style={{
                          justifyContent : 'center',
                          fontSize: 20
                        }}
                      > 
                        {product.name}
                      </Text>
                      
                      <Text
                        style={{
                          fontSize:16,
                          color: "#3F51B5",
                          marginTop:10
                        }}
                      >
                        {product.profession}
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
                  <Icon name="check-circle" 
                        style={{
                          margin: 10, 
                          fontSize: 20,
                          color: "#3F51B5"
                  }}/> 
                  <Text>{(product.project)?product.project:'0'}</Text>
                  <Right/>
                  <Icon name="star" 
                        style={{
                          margin: 10, 
                          fontSize: 20,
                          color: "#3F51B5"
                  }}/> 
                  <Text>{(product.done)?(product.done/product.project*100):'0'}%</Text>
                </CardItem>
            </Card>
            ))  
        } 
        </Content>
         */}
        <Content>
          <FlatGrid
              itemDimension={130}
              items={data}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                  <TouchableOpacity style={styles.itemContainer} onPress={() => { (this.props.category)&&this._setIdEngineer(item.created_by) } }>
                      <Image source={{ uri: `http://18.233.99.1:3000/myhire/file/${item.photo}` }} style={{ flex: 1, borderRadius: 5 }} />
                      <View style={styles.name} >
                          <Text style={{ color: '#fff', fontSize:20}}>{item.name}</Text>
                          <Text style={{ color: '#fff' }}>{item.skill}</Text>
                          
                          <View style={{flex:1, flexDirection:"row"}}>
                            
                          <Text style={{ color: "white"}}><Icon name="check" 
                            style={{
                              margin: 1, 
                              fontSize: 16,
                              color: "green",
                            }}/>   {(item.project)?item.project:'0'}</Text>

                        <Text style={{right:0, color: "white", position:"absolute", textAlign: "center"}}><Icon name="star-half-alt" 
                          style={{
                            margin: 5, 
                            fontSize: 16,
                            color: "yellow",
                            alignItems: "flex-end",
                      }}/>{(item.done)?(item.done/item.project*100):'0'}% </Text>
                          </View>
                         
                      </View>
                  </TouchableOpacity>
              )}
          />
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
                <Icon name="user-alt" style={{fontSize: 24, color: "white"}}/>
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
              >
                <Icon name="suitcase" style={{fontSize: 24, color: "white"}} />
                <Text>Project</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button full 
                onPress={() => this.props.navigation.navigate('Logout')}
              >
                <Icon name="sign-out-alt" style={{fontSize: 24, color: "white"}}/>
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
  

  const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
        flex: 1,
    },
    name: {
        width:'100%',
        position: 'absolute',
        color: '#fff',
        backgroundColor: "rgba(0, 0, 0, 0.7)" ,
        paddingLeft: 5,
        paddingBottom: 10
        
    },

    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 100,
        height: 200,
        position: 'relative'
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(Home)