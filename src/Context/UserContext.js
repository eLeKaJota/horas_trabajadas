/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Text} from 'react-native';

export const User = createContext();

const UserContext = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [account, setAccount] = useState();
  const [showChild, setShowChild] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      setShowChild(true);
      getAccount(user._user.email);
    }
  }, [user]);

  const getAccount = async userEmail => {
    const userAccount = await firestore().collection('accounts').get();
    let acc;
    userAccount.forEach(account => {
      if (account.data().email === userEmail) {
        acc = account;
      }
    });
    setAccount(acc);
  };

  if (initializing) {
    return null;
  }

  if (!showChild) {
    return (
      <>
        <Text>waa</Text>
      </>
    );
  } else {
    return (
      <User.Provider
        value={{
          user,
          account,
        }}>
        {children}
      </User.Provider>
    );
  }
};

export default UserContext;
