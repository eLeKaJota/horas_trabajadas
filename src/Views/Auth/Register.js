import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
  const [user, onChangeUser] = useState();
  const [username, onChangeUsername] = useState();
  const [password, onChangePassword] = useState();
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 150,
    },
    fixToText: {
      padding: 20,
    },
  });

  const onRegisterHandle = () => {
    if (user && password && username) {
      auth()
        .createUserWithEmailAndPassword(user, password)
        .then(res => {
          console.log('signed in!', res.user._user.uid);
          firestore()
            .collection('accounts')
            .add({
              email: user,
              username: username,
              uid: res.user._user.uid,
              created: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              console.log('User added!');
            });
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  return (
    <View style={styles.center}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUser}
        value={user}
        autoComplete={'email'}
        placeholder="User email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="User Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.fixToText}>
        <Button onPress={onRegisterHandle} title="Register" />
      </View>
    </View>
  );
};

export default Register;
