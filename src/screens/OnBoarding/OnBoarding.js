import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const {COLORS, FONTS, SIZES} = theme;

const OnBoarding = () => {
  function buttons(title) {
    return (
      <TouchableOpacity onPress={() => console.log('OK')}>
        <LinearGradient
          colors={['#B993D6', '#8CA6DB']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.button}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto-Bold',
              color: COLORS.white,
            }}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function renderContent() {
    return (
      // View Container
      <View style={styles.logoContainer}>
        {/* View Image */}
        <View style={styles.img}>
          <Image
            source={require('../../assets/images/food-delivery.png')}
            resizeMode="cover"
            style={{width: 120, height: 120}}
          />
        </View>
        {/* View app name */}
        <View style={styles.textContainer}>
          <Text style={styles.text1}>SM</Text>
          <Text style={styles.text2}>Delivery</Text>
        </View>
        {/* View Button */}
        <View style={styles.buttonContainer}>
          <View>{buttons('Đăng nhập')}</View>
          <View>{buttons('Đăng ký ngay')}</View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#56CCF2', '#2a5298']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        {renderContent()}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  img: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: SIZES.width,
    height: 300,
  },
  textContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    height: 150,
  },
  text1: {
    ...FONTS.f2,
    color: COLORS.yellow,
  },
  text2: {
    ...FONTS.f1,
    color: COLORS.red,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 62,
    width: 210,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
});

export default OnBoarding;
