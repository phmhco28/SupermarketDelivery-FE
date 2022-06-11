import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import theme from '../constants/theme';

const {COLORS, FONTS, SIZES} = theme;

export default function Header(props) {
  const {tittle} = props;
  return (
    <View style={styles.container}>
      <View style={styles.header_left}>
        <TouchableOpacity>
          <FeatherIcon name="menu" color={COLORS.yellow} size={27} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.header_text}> {tittle.name} </Text>
      </View>
      <View>
        <TouchableOpacity>
          <FontAwesomeIcon name="bell" color={COLORS.yellow} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '7%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    paddingRight: 15,
  },

  header_left: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
  },
  header_text: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
