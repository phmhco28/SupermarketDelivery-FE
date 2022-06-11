import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import theme from '../constants/theme';

const {COLORS, FONTS, SIZES} = theme;

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text> Day la trang thong tin ca nhan cua shipper</Text>
    </SafeAreaView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
});
