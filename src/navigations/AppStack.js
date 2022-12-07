import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Home,
  Orders,
  Profile,
  Shift,
  Payment,
  DrawerScreen,
  Map_Mapbox,
  ChangeTime,
} from '../screens';
import AuthStack from './AuthStack';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerScreen {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Map_Mapbox" component={Map_Mapbox} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Shift" component={Shift} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="ChangeTime" component={ChangeTime} />
      <Drawer.Screen name="authStack" component={AuthStack} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
};

export default AppStack;
