// import React from 'react';
// import {View, Image, TouchableOpacity} from 'react-native';
// import {
//   createBottomTabNavigator,
//   BottomTabBar,
// } from '@react-navigation/bottom-tabs';
// import {Home, Orders, Profile} from '../screens';
// import {COLORS, icons} from '../constants';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import FeatherIcon from 'react-native-vector-icons/Feather';

// const Tab = createBottomTabNavigator;
// const Tabs = () => {
//   return (
//     <Tab.navigator
//     tabBarOption={{
//         showLabel : false,
//         style:{
//             borderTopWidth: 0,
//             backgroundColor: "transparent",
//         }
//         }}
//         >
//       <Tab.screen
//         name="Home"
//         component={Home}
//         options={{
//             tabBarIcon: {icons.menu},
//             resizeMode="contain",
//             style={
//                 width: 25,
//                 height: 25,
//                 tintColor: focused ? COLORS.primary : COLORS,secondary,
//             },
//         }}
//          />
//          <Tab.screen
//         name="Map"
//         component={Map}
//         options={{
//             tabBarIcon: {icons.cutlery},
//             resizeMode="contain",
//             style={
//                 width: 25,
//                 height: 25,
//                 tintColor: focused ? COLORS.primary : COLORS,secondary,
//             },
//         }}
//          />
//          <Tab.screen
//         name="Orders"
//         component={Orders}
//         options={{
//             tabBarIcon: {icons.cutlery},
//             resizeMode="contain",
//             style={
//                 width: 25,
//                 height: 25,
//                 tintColor: focused ? COLORS.primary : COLORS,secondary,
//             },
//         }}
//          />
//          <Tab.screen
//         name="Profile"
//         component={Profile}
//         options={{
//             tabBarIcon: {icons.cutlery},
//             resizeMode="contain",
//             style={
//                 width: 25,
//                 height: 25,
//                 tintColor: focused ? COLORS.primary : COLORS,secondary,
//             },
//         }}
//          />
//     </Tab.navigator>
//   );
// };
// export default Tabs;
