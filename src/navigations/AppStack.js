import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import {OnBoarding, SignIn, SignUp} from '../screens';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen />
    </Stack.Navigator>
  );
};

export default AppStack;
