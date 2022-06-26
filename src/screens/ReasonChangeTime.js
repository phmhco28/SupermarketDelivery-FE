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

const ReasonChangeTime = ({navigation}) => {
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
          <Text style={styles.header_text}>LÝ DO</Text>
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
    return navigation.navigate('Orders');
  }

  function renderReason() {
    return (
      <View style={styles.container}>
        {/* shipper info */}
        <View style={styles.box_info}>
          <View style={styles.box_info_name}>
            <Text style={styles.acc_text}>Đổi giờ</Text>
          </View>
          <View>
            <View style={styles.Reason}>
              <TouchableOpacity>
                <View style={styles.checkBox_unchecked}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Ca 1 (7h-12h)</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity>
                <View style={styles.checkBox_unchecked}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Ca 2 (12h-16h)</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity>
                <View style={styles.checkBox_unchecked}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Ca 3 (17h-21h)</Text>
            </View>
          </View>
          <View style={styles.box_info_name}>
            <Text style={styles.acc_text}>Hủy giao</Text>
          </View>
          <View>
            <View style={styles.Reason}>
              <TouchableOpacity>
                <View style={styles.checkBox_unchecked}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Từ chối nhận hàng</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity>
                <View style={styles.checkBox_unchecked}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Khách báo không có đặt hàng</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity>
                <View style={styles.checkBox_unchecked}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>
                Không liên lạc được nhiều lần
              </Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity>
                <View style={styles.checkBox_unchecked}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Khác</Text>
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
      {renderReason()}
    </SafeAreaView>
  );
};
export default ReasonChangeTime;

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
  Reason: {
    flexDirection: 'row',
    padding: 8,
  },
  checkBox_checked: {
    //alignSelf: 'center',
    width: 25,
    height: 25,
    borderWidth: 1,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
  },
  checkBox_unchecked: {
    //alignSelf: 'center',
    width: 25,
    height: 25,
    borderWidth: 1,

    borderRadius: 5,
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
    height: '50%',
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
    //marginTop: 16,
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
