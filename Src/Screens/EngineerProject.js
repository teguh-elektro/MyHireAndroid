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

class EngineerProject extends React.Component {
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
          const auth = await Axios.get('http://18.233.99.1:3000/myhire/readproject')
          console.log(auth.data.result);
          await this.setState({
            project: auth.data.result
          })
        }catch(error){
            console.log(error);
        }
    }

    _changeStatus = async(id, status) =>{
      try{
        console.log(id);
        
        Axios.defaults.headers.common['Authorization'] = this.props.token;
        const auth = await Axios.put('http://18.233.99.1:3000/myhire/statusproject',
          {
            id,
            status 
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
            <Header />
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
        <Header />
        <Content>
          <List>
            {
                project.map(data => (
                  <ListItem>
                    <Body>
                      <Text>{data.name}</Text>
                      <Text note>{data.id_company}</Text>
                      <Text note>Rp.{data.budget}</Text>
                    </Body>
                    <Right>
                    {
                        (data.status != '1')?
                          <Button      
                            onPress={() => {this._changeStatus(data.id, 1)}}
                          >
                          <Text>Accept</Text>
                          </Button>
                          :
                          <Button      
                          onPress={() => {this._changeStatus(data.id, 0)}}
                        >
                        <Text>Decline</Text>
                        </Button>
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
  export default connect(mapStateToProps, mapDispatchToProps)(EngineerProject);

