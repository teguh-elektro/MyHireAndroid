import { connect } from 'react-redux';
import Axios from 'axios'
// Imports: Redux Actions


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
           
        }
    }

    render() {
      console.log(this.props.loggedIn);
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
                <CardItem button onPress={() => this.props.navigation.navigate('Profile')}>
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
          (isLogin)?
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
                onPress={() => this.props.navigation.navigate('Project')}
                badge vertical 
              >
              <Badge><Text>2</Text></Badge>
                <Icon name="apps" />
                <Text>Project</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button full 
                onPress={() => this.props.navigation.navigate('Project')}
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
  

  class SignUp extends React.Component {
    render() {
      return (
        <Container>
        <Header>
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

              />
            </Item>
            <Item floatingLabel style={{margin: 15}}>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item picker style={{margin: 15}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                
              >
                <Picker.Item label="Engineer" value="key0" />
                <Picker.Item label="Company" value="key1" />
              </Picker>
            </Item>
            <Button style={{margin: 15, borderRadius: 10}} onPress={() => this.props.navigation.navigate('SignUp')}>
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

  class SignIn extends React.Component {
    _storeData = async (jwt, category) => {
        console.log(jwt, category)
        try {
            //await AsyncStorage.setItem('category', category);
            await AsyncStorage.setItem('token', jwt);
          
          console.log(jwt, category)
          
        } catch (error) {
          // Error saving data
        }
      }
    
    _sendLogin = async () => {
        isLogin = 0; 
        try{
          const auth = await Axios.post('http://18.233.99.1:3000/myhire/login',
              {
                  username: this.state.username,
                  password: this.state.password
              }
          )
              console.log(auth.data.result.category);
              
          await this._storeData(auth.data.result.token, auth.data.result.category)
        }catch(error){

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
                onChangeText={value => this.setState({password: value})}
              />
            </Item>
            <Button 
                onPress={() => {this._sendLogin()}}
                style={{margin: 15, borderRadius: 10}} 
                onPress={() => this.props.navigation.navigate('Home')}
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


  class Profile extends React.Component{
    render() {
      return (
        <Container>
          <Header />
          <Grid>

            <Col style={{ backgroundColor: '#635DB7', height: 200 }}>
              <Body>
                <Image 
                  source={{uri: `http://18.233.99.1:3000/myhire/file/default.png`}} 
                  style={{height: 200, width: 180}}
                />
              </Body>
            
            </Col>
            <Col style={{ backgroundColor: '#00CE9F', height: 400 }}>
              <View>
                <Button 
                  onPress={() => this._sendLogin()}
                  style={{margin: 15, borderRadius: 10}} 
                >
                  <Text>Hire</Text>
                </Button>
              </View>
            </Col>
          </Grid>
          <Grid>

            <Col style={{ backgroundColor: 'red', height: 200 }}>
              
            <ScrollView >
            
                <Text>Name:</Text>
                <Text>{this.props.name}</Text>
                <Text>t</Text>
                <Text>{this.props.name}</Text>
                <Text>t</Text>
                <Text>{this.props.name}</Text>
                <Text>t</Text>
                <Text>{this.props.name}</Text>
                <Text>t</Text>
                <Text>{this.props.name}</Text>
                <Text>t</Text>
                <Text>{this.props.name}</Text>
                <Text>t</Text>
                <Text>{this.props.name}</Text>
                <Text>t</Text>
                <Text>{this.props.name}</Text>
                
                </ScrollView>
            
            </Col>
          </Grid>
        </Container>
      );
    }
  }

  const test = ["test\t", "hallo"]

  const dataArray = [
    { title: "Online Shop", content: test },
    { title: "Monitor Software", content: "kd;;dskfls;k;lsk;sks;ks;ks" },
    { title: "Market Lister", content: "lksld;sfk;lsk;sk;ksl;dsk;lks;lksl;" }
  ];

  class Project extends React.Component{
    render(){
      return(
        <Container>
        <Header searchBar rounded
                autoCorrect={false}>
            <Right>
              <Button>
                  <Text>Add Project</Text>
              </Button>
            </Right>
        </Header>   
        <Content padder>
          <Accordion
            dataArray={dataArray}
            // headerStyle={{ backgroundColor: "#b7daf8" }}
            // contentStyle={{ backgroundColor: "#ddecf8" }}
          />
        </Content>
      </Container>

      )
    }
  }

  const AppNavigator = createStackNavigator(
    {
      Home: Home,
      SignUp: SignUp,
      SignIn: SignIn,
      Profile: Profile,
      Project: Project  
    },
    {
      initialRouteName: 'Home',
    }
  );

    
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

  // Exports
export default connect(mapStateToProps, mapDispatchToProps)(createAppContainer(AppNavigator));