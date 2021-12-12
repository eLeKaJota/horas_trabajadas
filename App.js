import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UserContext, {User} from './src/Context/UserContext';
import {HomeScreen} from './src/Views/HomeScreen';
import {MainNavigator} from './src/Navigator/MainNavigator';
import {RootNavigator} from './src/Navigator/RootNavigator';

const App = () => {
  return (
    <UserContext>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UserContext>
  );
};

export default App;
