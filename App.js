import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UserContext from './src/Context/UserContext';
import {MainNavigator} from './src/Navigator/MainNavigator';

const App = () => {
  return (
    <UserContext>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </UserContext>
  );
};

export default App;
