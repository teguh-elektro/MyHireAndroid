import React, { Component } from 'react';
import AppNavigator from './Src/Screens/index'
import { createAppContainer } from 'react-navigation';
// import {AsyncStorage} from 'react-navigation';



// export default class App extends React.Component {
  
//   render() {
//     return <AppContainer />;
//   }
// }

// // Imports: Dependencies
// import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import { Text } from 'native-base'

// Imports: Screens
// import Counter from './screens/Counter';

// Imports: Redux Persist Persister
import { store, persistor } from './Src/redux/store/store';

const AppContainer = createAppContainer(AppNavigator);
// React Native: App
export default App = () => {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate 
        loading={<Text> LOADING </Text>}
        persistor={persistor}
      >
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};