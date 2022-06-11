import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import theme from '../constants/theme';
import Header from '../components/Header';

const {COLORS, FONTS, SIZES} = theme;

const Orders = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header tittle="Giao hàng" />
      <Text> Day la trang orders</Text>
    </SafeAreaView>
  );
};
export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
});
