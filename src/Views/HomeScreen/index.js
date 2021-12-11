import React from 'react';
import {User} from '../../Context/UserContext';
import {Button, Text, View} from 'react-native';
import {useContext} from 'react';

export const HomeScreen = ({navigation}) => {
  const {user, account} = useContext(User);

  if (!user) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }
  if (!account) {
    return <Text>Cargando</Text>;
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/*<Text>User Name: {JSON.stringify(account)}</Text>*/}
      <Text>Usuario: {account.data().username}</Text>
      <Text>Id: {account.id}</Text>
      <Text>Eiii {user.email}</Text>
    </View>
  );
};
