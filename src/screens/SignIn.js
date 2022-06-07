import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable'
import theme from '../constants/theme';

const {COLORS, FONTS, SIZES} = theme;



export default function SignIn({navigation}) {
  const [data, setdata] = React.useState({
    idCard: '',
    password: '',
    secureTextEntry: true,
    textInputChange: false
  });

  const textInputChange = (val) => {
    if( val.trim().length >= 4 ) {
        setData({
            ...data,
            username: val,
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange: false,
            isValidUser: false
        });
    }
  }

  const changeSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  }



  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.blue}/>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>         
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.header}>
             <Text style={[styles.textHeader, {paddingBottom: 38}]}>Chào mừng đến với Smart!</Text>
             <Animatable.Image animation='wobble' duration={2800} easing='ease-in-out-cubic' style={{width: 100,height: 102}} source={require('../assets/images/vecteezy_delivery-man-flat-icons-set-colorful-style_6431622-removebg.png')}/>
            </View>          
            <View style={styles.content}>
              <Text style={styles.textFooter}>CMND/CCCD</Text>
              <View style={styles.form}>
                <FontAwesomeIcon name="user-o" color={COLORS.green} size={20} />
                <TextInput placeholder="Nhập CMND hoặc CCCD" style={styles.textInput} autoCapitalize='none'/> 
                <FeatherIcon name="check-circle" color={COLORS.green} size={20} />
              </View>
              <Text style={[styles.textFooter,{marginTop: 20}]}>Mật khẩu</Text>
              <View style={styles.form}>
                <FeatherIcon name="lock" color={COLORS.green} size={20} />
                <TextInput placeholder="Nhập mật khẩu" style={styles.textInput} secureTextEntry autoCapitalize='none'/>
                <FeatherIcon name="eye-off" color={COLORS.green} size={20} />
              </View>
              <TouchableOpacity style={{width: 150}}>
                <Text style={{color: '#009387', marginTop:15}}>Quên mật khẩu?</Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} // onPress={() => {loginHandle( data.username, data.password )}}
                >
                  <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.signIn}>
                    <Text style={[styles.textSign, {color:'#fff'}]}>Đăng nhập</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('SignUpScreen')}
                  style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginTop: 15
                  }]}>
                  <Text style={[styles.textSign, {color: '#009387'}]}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },

});
