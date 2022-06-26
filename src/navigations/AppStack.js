import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Home,
  Orders,
  Profile,
  Map,
  Shift,
  Payment,
  DrawerScreen,
  ReasonChangeTime,
  EditProfile,
} from '../screens';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerScreen {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Shift" component={Shift} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="ReasonChangeTime" component={ReasonChangeTime} />
    </Drawer.Navigator>
  );
};

export default AppStack;
