import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './Login/Login'
import SignUp from './Register/Regist'
import Profile from './Profile/Profile'
import Project from './Project/Project'
import Logout from './Logout/Logout'
import Home from './Home/Home'
import ProjectList from './Project/ProjectList'
import Hirring from './Project/hirring'
import Review from './Profile/Review'
import EngineerProject from './Project/EngineerProject'
import AddProject from './Project/AddProject'
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
      EngineerProject: EngineerProject,
      AddProject: AddProject
    },
    {
        headerMode: 'none',
      initialRouteName: 'Home',
    }
  );

export default createAppContainer(AppNavigator);