import { connect } from 'react-redux';
import Axios from 'axios'
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon, Button, Text } from 'native-base';
import { jwt } from '../../redux/actions/tokenAction'
import { getEngineer } from '../../redux/actions/engineerActions'

class Hirring extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      project: []
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
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

   _sendProject = async (id) => {
    const {project} = this.state;
    const selected = project[id];
    console.log(selected);
    console.log(id);
    try{
      Axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await Axios.put('http://18.233.99.1:3000/myhire/changeproject',
        {
          id: selected.id,
          done: selected.done,
          name: selected.name,
          budget: selected.budget,
          description: selected.description,
          skill: selected.skill,
          id_engineer: this.props.id,
        }
      )
      
      
      console.log('send!');
      
    }catch(error){
      console.log(error)
    }
   }
  
   render() {
    const {project} = this.state;
    
    
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your Project"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {
                  project.map((data, index) => (
                    <Picker.Item label={data.name} value={index} />
                  ))
                }
              </Picker>
            </Item>
          </Form>
          <Button 
                style={{margin: 15, borderRadius: 10}} 
                onPress = {()=>{this._sendProject(this.state.selected2)}}
                // onPress={()=>{ this._sendProject(data.id, data.name, data.skill, data.description, data.budget, data.done)}}
            >
              <Text>
                Send
              </Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Hirring)