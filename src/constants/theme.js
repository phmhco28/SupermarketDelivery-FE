import {Dimensions} from 'react-native';

const {width, heigth} = Dimensions.get('window');

export const SIZES = {
  base: 8,
  font: 14,
  radius: 24,
  padding: 24,

  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  width,
  heigth,
};

export const FONTS = {
  f1: {fontSize: 52, fontFamily: 'Roboto-Black'},
  f2: {fontSize: 38, fontFamily: 'Roboto-Black'},
  f3: {fontSize: 20, fontFamily: 'Roboto-Bold'},
};

export const COLORS = {
  blue: '#2480c7',
  white: '#FFFFFF',
  yellow: '#ebe38a',
  red: '#eb6363',
  green: '#65cf81',
  orange: '#d96e30',
  gray: '#818a84',
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
