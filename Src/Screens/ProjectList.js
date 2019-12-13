import Axios from 'axios'
// Imports: Redux Actions
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../redux/actions/counterActions';
import { getEngineer } from '../../redux/actions/engineerActions'
import { jwt } from '../../redux/actions/tokenAction'

import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View, Button } from 'native-base';

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

    _getProject = async () => {
        try{
          Axios.defaults.headers.common['Authorization'] = this.props.token;
          const auth = await Axios.get('http://192.168.1.16:3000/myhire/readproject')
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
        const auth = await Axios.put('http://192.168.1.16:3000/myhire/doneproject',
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
              <Left>
                <Button
                  onPress = {()=>{this.props.navigation.navigate('AddProject')}}
                >
                  <Text>
                    Add Project
                  </Text>
                </Button>
              </Left>
            </Header>
            <Content>
              <View>
                <Text>
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
          <Left>
            <Button
              onPress = {()=>{this.props.navigation.navigate('AddProject')}}
            >
              <Text>
                Add Project
              </Text>
            </Button>
          </Left>
        </Header>
        <Content>
          <List>
            {
                project.map((data, index) => (
                  <ListItem key={index}>
                    <Body>
                      <Text>{data.name}</Text>
                      <Text note>{data.id_engineer}</Text>
                    </Body>
                    <Right>
                    {
                        (data.done != '1')?
                          <Button      
                            onPress={() => {this._changeDone(data.id, 1)}}
                          >
                          <Text>Progress</Text>
                          </Button>
                          :
                          <Button      
                          onPress={() => {this._changeDone(data.id, 0)}}
                        >
                        <Text>Done</Text>
                        </Button>
                    }
                    {
                      (data.status != '1')?
                        <Text note style={{backgroundColor: 'red', color: 'white'}}>pedding</Text> 
                        :
                        <Text note style={{backgroundColor: 'green', color: 'white'}}>accept</Text>
                    }
                    </Right>
                  </ListItem>
                ))
            }
          </List>
        </Content>
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
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);

