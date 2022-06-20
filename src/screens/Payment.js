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

const {COLORS, FONTS, SIZES} = theme;

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* header ==========================*/}
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
          <Text style={styles.header_text}>NỘP TIỀN</Text>
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesomeIcon name="bell" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* shipper info */}
      <View style={styles.box_info}>
        <View style={styles.box_info_name}>
          <Text style={styles.acc_text}>Tiền mặt cần nộp</Text>
          <Text style={{color: 'red', paddingRight: 8}}>1,090,000 đ</Text>
        </View>
        <View style={styles.box_info_name}>
          <Text style={styles.acc_text}>Tiền nộp</Text>
          <Text style={{color: 'black', paddingRight: 8}}>1,090,000 đ</Text>
        </View>
        <View style={styles.box_info_name}>
          <Text style={styles.acc_text}>Dư nợ</Text>
          <Text style={{color: 'black', paddingRight: 8}}>0 đ</Text>
        </View>
        <View style={styles.box_info_name}>
          <Text style={styles.acc_text}>Tiền thưởng</Text>
          <Text style={{color: 'black', paddingRight: 8}}>89,000 đ</Text>
        </View>
      </View>

      {/* shipper info */}

      <View style={styles.btn_scan}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              paddingRight: 16,
            }}>
            Scan mã nhân viên thu ngân
          </Text>
          <FontAwesomeIcon name="camera" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  btn_scan: {
    width: '50%',
    padding: 8,
    borderWidth: 1,
    backgroundColor: '#1e90ff',
    borderRadius: 10,

    margin: 32,
  },
  box_p_btn: {
    width: '75%',
    height: '30%',
    justifyContent: 'flex-end',
    marginBottom: '5%',
    //borderWidth: 1,
  },
  p_btn: {
    backgroundColor: '#1e90ff',
    paddingBottom: 8,
    marginBottom: 8,
    paddingLeft: 88,
    paddingRight: 88,
    padding: 8,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
  },
  box_info: {
    borderWidth: 1,
    width: '90%',
    height: '25%',
    marginTop: 24,
    paddingLeft: 8,
    borderRadius: 10,
    justifyContent: 'center',
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
