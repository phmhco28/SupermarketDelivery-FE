import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../constants/theme';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {COLORS, FONTS, SIZES} = theme;

export default function Boxes(props) {
  const {box} = props;
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.tittle}>{box.name}</Text>
        <FontAwesome5Icon
          style={styles.icon}
          name={box.icon}
          color={COLORS.yellow}
          size={50}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    shadowColor: COLORS.blue,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0},
    backgroundColor: COLORS.orange,
    marginTop: 8,
    borderRadius: 5,
  },
  tittle: {
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    marginBottom: 8,
  },
});
