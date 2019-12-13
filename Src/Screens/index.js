import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './Login'
import SignUp from './Regist'
import Profile from './Profile'
import Project from './Project'
import Logout from './Logout'
import Home from './Home'
import ProjectList from './ProjectList'
import Hirring from './hirring'
import Review from './Review'
import EngineerProject from './EngineerProject'
const AppNavigator = createStackNavigator(
    {
      Home: Home,
      SignUp: SignUp,
      SignIn: SignIn,
      Profile: Profile,
      Project: Project,
      Logout: Logout,
      ProjectList: ProjectList  ,
      Hirring: Hirring,
      Review: Review,
      EngineerProject: EngineerProject
    },
    {
        headerMode: 'none',
      initialRouteName: 'Home',
    }
  );

export default createAppContainer(AppNavigator);