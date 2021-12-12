import React from 'react';
import {User} from '../../Context/UserContext';
import {Button, Text, TouchableHighlight, View} from 'react-native';
import {useContext} from 'react';

export const HomeScreen = ({navigation}) => {
  const {user, account} = useContext(User);

  if (!user) {
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
  }
  if (!account) {
    return <Text>Cargando</Text>;
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={() => navigation.navigate('Projects')}>
        <View
          style={{
            backgroundColor: '#c7a09d',
            border: '1px solid',
            padding: 25,
            borderRadius: 5,
          }}>
          <Text>Proyectos</Text>
        </View>
      </TouchableHighlight>
      {/*<Text>User Name: {JSON.stringify(account)}</Text>*/}
      <Text>Usuario: {account.data().username}</Text>
      <Text>Id: {account.id}</Text>
      <Text>Eiii {user.email}</Text>
    </View>
  );
};
