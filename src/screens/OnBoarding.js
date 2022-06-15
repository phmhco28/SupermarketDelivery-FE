import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import theme from '../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const {COLORS, FONTS, SIZES} = theme;

//const Buttons = (props) => {}
function Buttons(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.route)}>
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
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function OnBoarding() {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 2200);
  }, []);

  function renderButton() {
    // const navigation = useNavigation();
    return (
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2fcfc',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          paddingBottom: 28,
          height: 300,
          transform: [{translateY: contentTransition}],
        }}>
        <Animated.View>
          <Buttons title="Đăng nhập" route="SignIn" />
        </Animated.View>
        <Animated.View>
          <Buttons title="Đăng ký ngay" route="SignUp" />
        </Animated.View>
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
            source={require('.././assets/images/vecteezy_delivery-man-flat-icons-set-colorful-style_6431622-removebg.png')}
            resizeMode="cover"
            style={{
              width: 150,
              height: 152,
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
        Animated.timing(zoomLogo, {toValue: 1.2, useNativeDriver: true}),
        Animated.timing(moveTitle, {
          toValue: {x: 0, y: -(Dimensions.get('window').height / 10 + 250)},
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {x: 0, y: -(Dimensions.get('window').height / 10) + 150},
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {toValue: 0, useNativeDriver: true}),
      ]).start();
    }, 2200);
  }, []); 

  //['#FFFDE4', '#005AA7']
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: COLORS.blue}]}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <LinearGradient
        colors={['#667db6', '#0082c8', '#0082c8', '#667db6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        >
        {renderContent()}
        <View>{showComponent && renderButton()}</View>
      </LinearGradient> */}
      <View>
        {renderContent()}
        <View>{showComponent && renderButton()}</View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  button: {
    height: 75,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 40,
    fontSize: 20,
  },
});
