import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import * as Animatable from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';

const {COLORS, FONTS, SIZES} = theme;

export default function SignUp({navigation}) {
  const date = new Date();
  const initState = {
    flash: false,
    isChecked: false,
    name: '',
    gender: 'Nữ',
    identityCard: '',
    phone: '',
    address: '',
    mail: '',
    isValidName: true,
    isValidId: true,
    isValidPhone: true,
    isValidAddr: true,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initState);
  const handleName = value => {
    if (value) {
      setData({...data, name: value, isValidName: true});
    }
  };
  const handleId = value => {
    if (value) {
      setData({...data, identityCard: value, isValidId: true});
    }
  };
  const handlePhone = value => {
    if (value) {
      setData({...data, phone: value, isValidPhone: true});
    }
  };
  const handleAddr = value => {
    if (value) {
      setData({...data, address: value, isValidAddr: true});
    }
  };
  const handleMail = value => {
    if (value) {
      setData({...data, mail: value});
    }
  };

  const handleFormSubmit = () => {
    if (!data.name.trim()) {
      setData(d => ({...d, isValidName: false, flash: true}));
    }
    if (data.identityCard === '') {
      setData(d => ({...d, isValidId: false, flash: true}));
    }
    if (data.phone === '') {
      setData(d => ({...d, isValidPhone: false, flash: true}));
    }
    if (data.address === '') {
      setData(d => ({...d, isValidAddr: false, flash: true}));
    }
    if (data.flash === true) {
      return console.log(data);
    }
    fetch('http://192.168.1.3:8080/api/v0/registry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        gender: data.gender,
        address: data.address,
        phoneNumber: data.phone,
        identityCard: data.identityCard,
        mail: data.mail,
      }),
    })
      .then(res => {
        if (res.ok) {
          return Alert.alert(
            'Ứng tuyển thành công',
            'Chúng tôi đã nhận được thông tin ứng tuyển của bạn! Xin cảm ơn',
          );
        }
        throw res;
      })
      .catch(error => {
        setData({
          ...data,
          errorMessage: error.message || error.statusText,
        });
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.blue} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{flex: 1}}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={[styles.textHeader, {paddingBottom: 38}]}>
                  Chào mừng đến với Smart!
                </Text>
                <Animatable.Image
                  animation="wobble"
                  duration={2800}
                  easing="ease-in-out-cubic"
                  style={{width: 100, height: 102}}
                  source={require('../assets/images/vecteezy_delivery-man-flat-icons-set-colorful-style_6431622-removebg.png')}
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.textFooter}>Họ tên*</Text>
                <View style={styles.form}>
                  <TextInput
                    placeholder="Nhập họ và tên"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => handleName(val)}
                  />
                </View>
                {data.isValidName === false ? (
                  <Text style={styles.errorMessage}>
                    Vui lòng nhập họ tên !
                  </Text>
                ) : null}
                <Text style={styles.textFooter}>Giới tính*</Text>
                <View style={styles.form}>
                  <CheckBox
                    value={data.isChecked}
                    onValueChange={() =>
                      setData({
                        ...data,
                        isChecked: !data.isChecked,
                        gender: 'Nam',
                      })
                    }
                  />
                  <Text style={styles.textFooter}>Nam</Text>

                  <CheckBox
                    value={!data.isChecked}
                    onValueChange={() =>
                      setData({
                        ...data,
                        isChecked: !data.isChecked,
                        gender: 'Nữ',
                      })
                    }
                  />
                  <Text style={styles.textFooter}>Nữ</Text>
                </View>
                <Text style={styles.textFooter}>CMND/CCCD*</Text>
                <View style={styles.form}>
                  <TextInput
                    placeholder="Nhập CMND hoặc CCCD"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => handleId(val)}
                  />
                </View>
                {data.isValidId === false ? (
                  <Text style={styles.errorMessage}>
                    Vui lòng nhập CMND/CCCD !
                  </Text>
                ) : null}
                <Text style={styles.textFooter}>Số điện thoại*</Text>
                <View style={styles.form}>
                  <TextInput
                    placeholder="Nhập số điện thoại"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => handlePhone(val)}
                  />
                </View>
                {data.isValidPhone === false ? (
                  <Text style={styles.errorMessage}>
                    Vui lòng nhập số điện thoại !
                  </Text>
                ) : null}
                <Text style={styles.textFooter}>Địa chỉ*</Text>
                <View style={styles.form}>
                  <TextInput
                    placeholder="Nhập địa chỉ"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => handleAddr(val)}
                  />
                </View>
                {data.isValidAddr === false ? (
                  <Text style={styles.errorMessage}>
                    Vui lòng nhập địa chỉ !
                  </Text>
                ) : null}
                <Text style={styles.textFooter}>Gmai</Text>
                <View style={styles.form}>
                  <TextInput
                    placeholder="Nhập Gmail (nếu có)"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => handleMail(val)}
                  />
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => handleFormSubmit()}>
                    <LinearGradient
                      colors={['#1e3c72', '#2a5298']}
                      style={styles.signIn}>
                      <Text style={[styles.textSign, {color: '#fff'}]}>
                        Gửi ứng tuyển
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                    style={[
                      styles.signIn,
                      {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                      },
                    ]}>
                    <Text style={[styles.textSign, {color: '#009387'}]}>
                      Đăng nhập
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    justifyContent: 'flex-start',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 20,
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
    paddingBottom: 3,
  },
  textInput: {
    flex: 1,
    marginTop: -12, //Platform.OS === 'ios' ? 0 : -12
    paddingLeft: 10,
    color: '#062338',
    fontSize: 15,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#FF0000',
    fontSize: 14,
    paddingLeft: 5,
  },
});
