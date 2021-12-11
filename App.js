import React, {useEffect, useState} from 'react';
import {
    Button,
    Text,
    View,
} from 'react-native';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Login from "./Views/Login";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [account, setAccount] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect( () => {
        setAccount(getAccount());
    }, [user]);

    const getAccount = async () => {
        const userAccount = await firestore().collection('accounts').where('email','==','cclaguia@gmail.com').get().then(res=>console.log(res.data));
        return userAccount;
    }

    if (initializing) return null;

    if (!user) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        );
    }

    if (!account){
        return <>Cargando</>;
    }
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/*<Text>User Name: {JSON.stringify(account)}</Text>*/}
          <Text>Eiii {user.email}</Text>
      </View>
  );
};

const DetailScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>

            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}


const Stack = createNativeStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
                         screenOptions={({navigation}) => ({
                             headerRight: () => {
                                 return (
                                     <Button
                                         onPress={() => auth()
                                             .signOut()
                                             .then(() => console.log('User signed out!'))}
                                         title="LogOut"
                                     />
                                 )
                             }
                         })}>
          <Stack.Screen name="Home" component={HomeScreen} options={
              {title: 'Hoooome',
                  headerStyle: {
                      backgroundColor: '#f4511e',
                      textAlign: 'center',
                  },
                  headerTitleAlign: 'center',
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                  },
              }
          }/>
          <Stack.Screen name="Details" component={DetailScreen} options={
              {title: 'Detaaaiiils',
                  headerStyle: {
                      backgroundColor: '#f4511e',
                      textAlign: 'center',
                  },
                  headerTitleAlign: 'center',
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                  },
              }
          }/>
            <Stack.Screen name="Login" component={Login} options={
                {title: 'Login',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                        textAlign: 'center',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    },
                }
            }/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
