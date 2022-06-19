import * as React from 'react';

import {
  Home,
  Orders,
  Profile,
  OnBoarding,
  SignIn,
  Map,
  Shift,
  Payment,
} from './src/screens/'; //Loc add 3 screens

import theme from './src/constants/theme';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const {COLORS, FONTS, SIZES} = theme;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Trang chủ" component={Home} />
      <Drawer.Screen name="Bản đồ" component={Map} />
      <Drawer.Screen name="Giao hàng" component={Orders} />
      <Drawer.Screen name="Ca làm" component={Shift} />
      <Drawer.Screen name="Hồ sơ" component={Profile} />
      <Drawer.Screen name="Nộp tiền - trả hàng" component={Payment} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={HomeDrawer}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Map"
          component={Map}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Shift"
          component={Shift}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
