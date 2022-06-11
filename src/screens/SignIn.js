import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import theme from '../constants/theme';

const {COLORS, FONTS, SIZES} = theme;

export default function SignIn() {
  function renderContent() {
    return <View></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Chào mừng bạn đến với Smart</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <FontAwesomeIcon name="user-o" color={COLORS.green} size={20} />
          <TextInput
            placeholder="Nhập CMND hoặc CCCD"
            style={styles.textInput}
          />
        </View>
        <View style={styles.form}>
          <FeatherIcon name="lock" color={COLORS.green} size={20} />
          <TextInput placeholder="Nhập mật khẩu" style={styles.textInput} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  content: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
  },
  form: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12, //Platform.OS === 'ios' ? 0 : -12
    paddingLeft: 10,
    color: '#05375a',
  },
});
