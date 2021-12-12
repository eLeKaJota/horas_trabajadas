import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native';

const Settings = ({navigation}) => {
  return (
    <Button
      onPress={() =>
        auth()
          .signOut()
          .then(() => navigation.navigate('MainNavigator'))
      }
      title="LogOut"
    />
  );
};

export default Settings;
