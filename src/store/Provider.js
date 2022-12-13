import React, {useEffect, useState} from 'react';
import AuthContext from './Context';
import {useReducer} from 'react';
import AuthReducer, {initState} from './Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      return value ? JSON.parse(value) : {};
    } catch (error) {
      console.log('Khong ton tai!')
    }
  };
  const getListPoint = async () => {
    try {
      const value = await AsyncStorage.getItem('point');
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('khong ton tai')
    }
  };
  const getDelivering = async () => {
    try {
      const value = await AsyncStorage.getItem('delivering');
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('khong ton tai')
    }
  };
  const getCompleted = async () => {
    try {
      const value = await AsyncStorage.getItem('completed');
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('khong ton tai')
    }
  };

  const getList = async () => {
    try {
      const value = await AsyncStorage.getItem('listPointOfOrder');
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('khong ton tai')
    }
  };
  useEffect(() => {
    //get user
    async function fetchUser() {
      const user = await getUser();
      dispatch({type: 'getUser', payload: user});
    }
    fetchUser();

    //get listpointOfOrder
    async function fetchList() {
      const listPointOfOrder = await getList();
      dispatch({type: 'getList', payload: listPointOfOrder});
    }
    fetchList();

    //get listpoint
    async function fetchPoint() {
      const listPoint = await getListPoint();
      dispatch({type: 'getListPoint', payload: listPoint});
    }
    fetchPoint();

    //get order delivering
    async function fetchDelivering() {
      const orderDelivering = await getDelivering();
      dispatch({type: 'getDelivering', payload: orderDelivering});
    }
    fetchDelivering();

    //get order completed
    async function fetchCompleted() {
      const orderCompleted = await getCompleted();
      dispatch({type: 'getCompleted', payload: orderCompleted});
    }
    fetchCompleted();
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
