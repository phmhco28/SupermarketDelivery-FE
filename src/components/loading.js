import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import theme from '../constants/theme';

const {COLORS} = theme;

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={COLORS.orange} style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loading;
