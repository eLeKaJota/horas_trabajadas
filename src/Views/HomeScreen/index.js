import React, {useEffect} from 'react';
import {User} from '../../Context/UserContext';
import {Button, Text, View} from 'react-native';
import {useContext} from 'react';

export const HomeScreen = ({navigation}) => {
  const {user, account} = useContext(User);
  useEffect(() => {
    if (user && account) {
      navigation.navigate('TabNavigator');
    }
  }, [account, navigation, user]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};
