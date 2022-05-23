import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import theme from '../../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const {COLORS, FONTS, SIZES} = theme;

export default function OnBoarding() {
  function buttons(title) {
    return (
      <TouchableOpacity onPress={() => console.log('OK')}>
        <LinearGradient
          colors={['#1e3c72', '#2a5298']}
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

  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 1500);
  }, []);

  function renderButton() {
    return (
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
          backgroundColor: '#16BFFD',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          paddingBottom: 28,
          height: 300,
          transform: [{translateY: contentTransition}],
        }}>
        <Animated.View>{buttons('Đăng nhập')}</Animated.View>
        <Animated.View>{buttons('Đăng ký ngay')}</Animated.View>
      </Animated.View>
    );
  }

  function renderContent() {
    return (
      // View Container
      <View style={styles.logoContainer}>
        {/* View Image */}
        <Animated.View style={styles.img}>
          <Animated.Image
            source={require('../../assets/images/vecteezy_delivery-man-flat-icons-set-colorful-style_6431622-removebg.png')}
            resizeMode="cover"
            style={{
              width: 120,
              height: 122,
              transform: [{scale: zoomLogo}, {translateY: moveLogo.y}],
            }}
          />
        </Animated.View>
        {/* View app name */}
        <Animated.View style={styles.textContainer}>
          <Animated.Text
            style={{
              ...FONTS.f1,
              color: COLORS.orange,
              transform: [{scale: scaleTitle}, {translateY: moveTitle.y}],
            }}>
            SMart
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }

  //ANIMATION
  const edges = useSafeAreaInsets();
  const zoomLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;
  const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const moveLogo = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const contentTransition = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  //ANIMATION
  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleTitle, {toValue: 0.75, useNativeDriver: true}),
        Animated.timing(zoomLogo, {toValue: 1.8, useNativeDriver: true}),
        Animated.timing(moveTitle, {
          toValue: {x: 0, y: -(Dimensions.get('window').height / 10 + 200)},
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {x: 0, y: -(Dimensions.get('window').height / 10) + 150},
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {toValue: 0, useNativeDriver: true}),
      ]).start();
    }, 1500);
  }, []);

  //['#FFFDE4', '#005AA7']
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667db6', '#0082c8','#0082c8','#667db6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        {renderContent()}
        <View>{showComponent && renderButton()}</View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    alignItems: 'center',
    width: SIZES.width,
  },
  textContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    height: 120,
  },
  button: {
    height: 72,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 40,
    fontSize: 20,
  },
});
