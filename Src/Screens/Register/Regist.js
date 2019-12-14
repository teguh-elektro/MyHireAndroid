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



  // Exports
export default SignUp