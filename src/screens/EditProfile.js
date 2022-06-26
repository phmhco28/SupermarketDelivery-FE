import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import theme from '../constants/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import 'react-native-gesture-handler';
import {TextInput} from 'react-native-gesture-handler';

const {COLORS, FONTS, SIZES} = theme;

const EditProfile = ({navigation}) => {
  function renderHeader() {
    return (
      <View style={styles.header_container}>
        <View style={styles.header_left}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <FeatherIcon name="menu" color="white" size={27} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.header_text}>CHỈNH SỬA HỒ SƠ</Text>
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesomeIcon name="bell" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function submit_clicked() {
    return navigation.navigate('Profile');
  }

  function renderShipperInfo() {
    return (
      <View style={styles.container}>
        {/* shipper info */}
        <View style={styles.box_info}>
          <View style={styles.box_info_name}>
            <Text style={styles.acc_text}>Thông tin cá nhân</Text>
          </View>
          <View>
            <View style={styles.info_textInput}>
              <Text style={styles.info_text}>Ngày sinh:</Text>
              <TextInput style={styles.acc_textInput}></TextInput>
            </View>
            <View style={styles.info_textInput}>
              <Text style={styles.info_text}>Giới tính:</Text>
              <TextInput style={styles.acc_textInput}></TextInput>
            </View>
            <View style={styles.info_textInput}>
              <Text style={styles.info_text}>Email:</Text>
              <TextInput style={styles.acc_textInput}></TextInput>
            </View>
          </View>
        </View>

        {/* button submit */}
        <TouchableOpacity
          style={styles.button_submit}
          onPress={() => {
            {
              submit_clicked();
            }
          }}>
          <View>
            <Text style={styles.button_title}>Xác nhận</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      {renderHeader()}
      {/* shipper info */}
      {renderShipperInfo()}
    </SafeAreaView>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  acc_textInput: {
    // flex: 1,
    width: '60%',
    height: '70%',
    borderBottomWidth: 1,
    padding: 8,
    marginRight: 24,
  },
  info_textInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button_title: {
    fontSize: 18,
    color: 'white',
  },
  button_submit: {
    backgroundColor: '#1e90ff',
    width: '60%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  box_info: {
    borderWidth: 1,
    width: '90%',
    height: '25%',
    marginTop: 24,
    paddingLeft: 8,
    borderRadius: 10,
  },
  box_info_name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  info_text: {
    paddingLeft: 16,
    color: 'black',
    paddingTop: 16,
  },
  avatar: {
    width: '100%',
    height: '20%',
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar_img: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acc_name: {
    alignItems: 'center',
  },
  acc_text: {
    color: 'black',
    paddingBottom: 8,
    fontWeight: '700',
  },
  acc_verify: {
    backgroundColor: '#228b22',
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    padding: 4,
  },
  header_container: {
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    flexDirection: 'row',
    paddingRight: 15,
    paddingTop: 22,
  },

  header_left: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
  },
  header_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
