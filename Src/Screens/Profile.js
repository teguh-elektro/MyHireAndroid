// import { connect } from 'react-redux';
// import Axios from 'axios'
// // Imports: Redux Actions
// // Imports: Redux Actions
// import { login } from '../../redux/actions/authActions';
// import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';
// import { jwt } from '../../redux/actions/tokenAction'
// import React from 'react';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { Image } from 'react-native';
// import { ActivityIndicator,    
//   ScrollView } from 'react-native'
// import {AsyncStorage} from 'react-native';

// import { 
//     Container, 
//     Header, 
//     Content, 
//     Form, 
//     Item, 
//     Input, 
//     Label, 
//     Left, 
//     Body, 
//     Right, 
//     Title, 
//     Button, 
//     Text,
//     View,
//     Picker,
//     Icon,
//     Footer, 
//     FooterTab,
//     Card, 
//     CardItem, 
//     Accordion,
//     Badge 
// } from 'native-base';
// import { Col, Row, Grid } from 'react-native-easy-grid';

// let isLogin = 0;

// class Profile extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       MyProfile: ''
//     }
//   }

//   componentDidMount(){
//     this.getMyData();
//   }

//   async getMyData(){
//    try{
//     Axios.defaults.headers.common['Authorization'] = this.props.token;
//     const profile = await Axios.get('http://192.168.1.16:3000/myhire/by/')
    
//     await this.setState({ 
//       MyProfile: profile.data.result[0]
      
//     });
//    }catch(error){
//     console.log(error);
//    } 
//   }


//     render() {
//       return (
//         <Container>
//           <Header />
//           <Grid>

//             <Col style={{ backgroundColor: '', height: 240 }}>
              
//                 <Image 
//                   source={{uri: `http://192.168.1.16:3000/myhire/file/${this.state.MyProfile.photo}`}} 
//                   style={{height: 200, width: 180, borderRadius: 10}}
//                 />
              
            
//             </Col>
//             <Col style={{ backgroundColor: '', height: 240 }}>
              
//               <View>
//                <Body style={{flex: 1}}>
//                </Body>
                
//               </View>
//             </Col>
//           </Grid>
//           <Text>My Profile:</Text>
//           <Grid>

//             <Col style={{ backgroundColor: '', height: 200 }}>
              
//             <ScrollView >

//                 <Text>Name:</Text>
//                 <Text>{this.state.MyProfile.name}</Text>
//                 <Text>t</Text>
//                 <Text>{this.props.name}</Text>
//                 <Text>t</Text>
//                 <Text>{this.props.name}</Text>
//                 <Text>t</Text>
//                 <Text>{this.props.name}</Text>
//                 <Text>t</Text>
//                 <Text>{this.props.name}</Text>
//                 <Text>t</Text>
//                 <Text>{this.props.name}</Text>
//                 <Text>t</Text>
//                 <Text>{this.props.name}</Text>
//                 <Text>t</Text>
//                 <Text>{this.props.name}</Text>
                
//                 </ScrollView>
            
//             </Col>
//           </Grid>
//         </Container>
//       );
//     }
//   }


// //   const AppNavigator = createStackNavigator(
// //     {
// //       Home: Home,
// //       SignUp: SignUp,
// //       SignIn: SignIn,
// //       Profile: Profile,
// //       Project: Project  
// //     },
// //     {
// //       initialRouteName: 'Home',
// //     }
// //   );

// const mapStateToProps = (state) => {
//   // Redux Store --> Component
//   return {
//     counter: state.counterReducer.counter,
//     loggedIn: state.authReducer.loggedIn,
//     token: state.tokenReducer.token,
//     engineerList: state
//   };
// };

// // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
// const mapDispatchToProps = (dispatch) => {
//   // Action
//     return {
//       // Increase Counter
//       reduxIncreaseCounter: () => dispatch(increaseCounter()),
//       // Decrease Counter
//       reduxDecreaseCounter: () => dispatch(decreaseCounter()),
//       // Login
//       reduxLogin: (trueFalse) => dispatch(login(trueFalse)),

//       reduxToken: (token) => dispatch(jwt(token)),

//       reduxEngineer: () => dispatch(getEngineer())
//    };
// };

// // Exports
// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
//   // Exports

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import Axios from 'axios'
import { jwt } from '../../redux/actions/tokenAction'
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import {
  Button,
  Text,
  Left,
  Right
} from 'native-base'
class Profile extends Component {
    constructor(props){
    super(props);
    this.state={
      MyProfile: ''
    }
  }

  componentDidMount(){
    this.getMyData();
  }

  async getMyData(){
   try{
    Axios.defaults.headers.common['Authorization'] = this.props.token;
    const profile = await Axios.get('http://192.168.1.16:3000/myhire/by/')
    console.log(profile.data.result[0]);
    
    await this.setState({ 
      MyProfile: profile.data.result[0]
      
    });
   }catch(error){
    console.log(error);
   } 
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: `http://192.168.1.16:3000/myhire/file/${this.state.MyProfile.photo}`}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.MyProfile.name}</Text>
              <Text style={styles.info}>{this.state.MyProfile.profession}</Text>
              <Text style={styles.description}>{this.state.MyProfile.email}</Text>
              <Text style={styles.description}>{this.state.MyProfile.phone_number}</Text>
              <Text style={styles.description}>{this.state.MyProfile.showcase}</Text>
              <Button
                style={{margin: 15, borderRadius: 10}} 
              >
              <Left/>
                <Text>
                  Edit
                </Text>
              <Right />
            </Button> 
            </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#3F51B5",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:40
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#3F51B5",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    token: state.tokenReducer.token
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      reduxToken: (token) => dispatch(jwt(token))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);