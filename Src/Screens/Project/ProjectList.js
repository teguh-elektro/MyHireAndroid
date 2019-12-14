import Axios from 'axios'
// Imports: Redux Actions
import { connect } from 'react-redux';
import {  StyleSheet, TouchableOpacity, Alert } from 'react-native'
// Imports: Redux Actions
import { login } from '../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';
import { getEngineer } from '../../redux/actions/engineerActions'
import { jwt } from '../../redux/actions/tokenAction'
import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View, Button, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
class ProjectList extends React.Component {
    constructor(props){
      super(props);
      this.state={
        project: []
      }
    }

    componentDidMount(){
      this._getProject()  
    }

    _alert = (id) => {
      Alert.alert(
        'Confirmation',
        'Do you want to finish this Project?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK', onPress: () => this._changeDone(id, 1)
          },
        ],
        {cancelable: false},
      );
    } 

    _getProject = async () => {
        try{
          Axios.defaults.headers.common['Authorization'] = this.props.token;
          const auth = await Axios.get('http://18.233.99.1:3000/myhire/readproject')
          console.log(auth.data.result);
          await this.setState({
            project: auth.data.result
          })
        }catch(error){
            console.log(error);
        }
    }

    _changeDone = async(id, done) =>{
      try{
        console.log(id);
        
        Axios.defaults.headers.common['Authorization'] = this.props.token;
        const auth = await Axios.put('http://18.233.99.1:3000/myhire/doneproject',
          {
            id,
            done
          }
        )
        this._getProject()
      }catch(error){
          console.log(error);
      }
    }

    render() {
      const { project } = this.state;
      if(!project.length) {
        return(
          <Container>
            <Header>
              <Title style={{margin: 15}}>My Project</Title>
            </Header>
            <Content>
              <View>
                <Text style={{margin: 30, textAlign: "center"}}>
                  Project list is empty!
                </Text>
              </View>
            </Content> 
          </Container> 
        )
      }
      return (
        <Container>
        <Header>
          <Title style={{margin: 15}}>My Project</Title>
        </Header>
        <Content>
          <List>
            {
                project.map((data, index) => (
                  <ListItem key={index}>
                    <Body>
                    <View style={{flex: 1, flexDirection: "row"}}>
                   <Text style={{margin: 15}}>{(!data.done)?<Icon name="clock" style={{margin: 2, fontSize:20, color:"blue"}}></Icon>:<Icon name="check" style={{margin: 2, fontSize:20, color:"green"}}></Icon>} {data.name}</Text>  
                      {/* <Text note>{data.id_engineer}</Text> */}
                      {
                        (data.status === 2)&&
                          <Text note style={{borderRadius: 3, textAlign: "center", backgroundColor: 'red', color: 'white', width: 70, height:20, position:"absolute", alignSelf:"center", right:0
                        }}>Decline</Text> 
                      }
                      {
                        (data.id_engineer === null)&&
                        <Text note style={{borderRadius: 3, textAlign: "center", backgroundColor: 'gray', color: 'white', width: 100, height:20, position:"absolute", alignSelf:"center", right:0}}>No Engineer</Text> 
                      }
                      {

                        
                        ((data.id_engineer !== null)&&(data.status === 0))&&
                        <Text note style={{borderRadius: 3, textAlign: "center", backgroundColor: '#FFC300', color: 'black', width: 80, height:20, position:"absolute", alignSelf:"center", right:0}}>Pending</Text> 
                      }
                      {
                        (data.status === 1)&&
                          <Text note style={{borderRadius: 3, textAlign: "center",backgroundColor: 'green', color: 'white', width: 70, height:20, position:"absolute", alignSelf:"center", right:0}}>Accept</Text>
                      }
                    </View>  
                      
                    {
                        ((data.done !== 1) && (data.status === 1))&&
                        <Button 
                          style={{flex:1, width: "100%", height: 30, justifyContent: "center", borderRadius: 10, backgroundColor: "#3F51B5"}}      
                            onPress={() => {this._alert(data.id)}}//this._changeDone(data.id, 1)
                          >
                          <Text>Done</Text>
                          </Button>
                    }
                    </Body>
                    
                  </ListItem>
                ))
            }
          </List>
          <Text style={{height:100}}/>
        </Content>
        <TouchableOpacity
          style={styles.floatBtn}
          onPress = {()=>{this.props.navigation.navigate('AddProject')}}
        >
          <Icon name="plus"  size={30} color="#ffffff" />
          </TouchableOpacity>
      </Container>
      );
    }
  } 

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
  
        reduxEngineer: (id) => dispatch(getEngineer(id))
     };
  };

  const styles = StyleSheet.create({
  floatBtn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    position: 'absolute',                                          
    bottom: 20,                                                    
    right: 20,
    backgroundColor:'#3F51B5',
    borderRadius:100,
  }});
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);

