import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import TextInput from '../../Components/Form/TextInput';
import Button from '../../Components/Form/Button';
import {useFormik} from 'formik';

const Login = ({navigation}) => {
  const password = useRef(null);

  const {handleChange, handleSubmit, values} = useFormik({
    initialValues: {email: '', password: ''},
    onSubmit: values => {
      if (values.email !== '' && values.password !== '') {
        auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            console.log('signed in!');
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
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#223e4b', fontSize: 20, marginBottom: 16}}>
        Login
      </Text>
      <View style={{paddingHorizontal: 32, marginBottom: 16, width: '100%'}}>
        <TextInput
          icon="mail"
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange('email')}
          onSubmitEditing={() => password.current?.focus()}
        />
      </View>
      <View style={{paddingHorizontal: 32, marginBottom: 16, width: '100%'}}>
        <TextInput
          ref={password}
          icon="key"
          placeholder="Enter your password"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          onChangeText={handleChange('password')}
        />
      </View>
      <Button label="Login" onPress={handleSubmit} />
    </View>
  );
};

export default Login;
