import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Avatar, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {block} from 'react-native-reanimated';
import {COLORS} from '../constants/theme';
import {useAuth} from '../store';
import {State} from 'react-native-gesture-handler';
import ip from '../api';


export default function DrawerScreen(props) {
  const [state, dispatch] = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isSending) {
      Logout();
      setIsSending(false);
    }
  }, [isSending]);
  const Logout = () => {
    dispatch({
      type: 'Logout',
      payload: null,
    });
    props.navigation.navigate('authStack', {screen: 'SignIn'});
  };
  const getUser = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/user?accId=${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state.user) {
      getUser(state.user.accountId);
    }
    console.log(user)
    console.log('user state: ' + state.user)
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1}}>
          <View style={styles.shipperInfo}>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <Avatar.Image
                source={require('../assets/images/avatar_temp.png')}
                size={65}
                style={{backgroundColor: 'transparent'}}
              />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Title style={styles.title}>
                  {user !== null ? user.name : null}
                </Title>
                <Caption style={styles.caption}>
                  ID: {user !== null ? user.shipperId : null}
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.menuSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Trang chủ"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="google-maps" color={color} size={size} />
              )}
              label="Bản đồ"
              onPress={() => {
                props.navigation.navigate('Map_Mapbox');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <IconFontAwesome5
                  name="shipping-fast"
                  color={color}
                  size={size}
                />
              )}
              label="Đơn hàng"
              onPress={() => {
                props.navigation.navigate('Orders');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <IconMaterial name="payment" color={color} size={size} />
              )}
              label="Thanh toán trả hàng"
              onPress={() => {
                props.navigation.navigate('Payment');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="calendar-account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Lịch làm việc"
              onPress={() => {
                props.navigation.navigate('Shift');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Thông tin cá nhân"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Đăng xuất"
          onPress={() => setIsSending(true)}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  shipperInfo: {
    paddingLeft: 5,
    borderBottomColor: COLORS.green,
    borderBottomLeftRadius: 12,
    borderBottomWidth: 6,
    paddingBottom: 5,
  },
  menuSection: {
    marginTop: 15,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  bottomSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
