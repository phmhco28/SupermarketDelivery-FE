import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {OnBoarding, SignIn, SignUp} from '../screens';
import AppStack from './AppStack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="drawerNavigate"
        component={AppStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
