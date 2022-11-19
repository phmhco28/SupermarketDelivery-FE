import React, {useEffect, useState} from 'react';
import AuthContext from './Context';
import {useReducer} from 'react';
import AuthReducer, {initState} from './Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  const getUser = async () => {
    const value = await AsyncStorage.getItem('user');
    return value ? JSON.parse(value) : {};
  };
  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      dispatch({type: 'getUser', payload: user});
    }
    fetchUser();
  }, []);

  // useEffect(() => {
  //   if(state.user) {
  //       // This check is required to avoid initial writing to asyncStorage
  //       console.log('state statettttt')
  //       console.log(state.user);
  //       AsyncStorage.setItem('user', JSON.stringify(state))
  //   }
  // }, [state.user]);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
