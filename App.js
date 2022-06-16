import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Home, Orders, Profile, OnBoarding, SignIn} from './src/screens/'; //Loc add 3 screens
//import Tabs from './src/navigations/tabs'; //Loc add Tabs
import theme from './src/constants/theme';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {COLORS, FONTS, SIZES} = theme;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Trang chủ" component={Home} />
      <Drawer.Screen name="Bản đồ" component={Map} />
      <Drawer.Screen name="Giao hàng" component={Orders} />
      <Drawer.Screen name="Hồ sơ" component={Profile} />
    </Drawer.Navigator>
  );
}

// function mytabs() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

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
        {/* <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Profile"
          component={Profile}
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
