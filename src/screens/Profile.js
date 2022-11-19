import React from 'react';
import Moment from 'moment';
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
import {useAuth} from '../store';
import ip from '../api';

const {COLORS, FONTS, SIZES} = theme;

const Profile = ({navigation}) => {
  Moment.locale('vi');
  const [state, dispatch] = useAuth();
  const [user, setUser] = React.useState(null);

  const getUser = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/user?accId=${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (state.user) {
      getUser(state.user.accountId);
    }
  }, []);

  const [isSending, setIsSending] = React.useState(false);
  React.useEffect(() => {
    if (isSending) {
      Logout();
      setIsSending(false);
    }
  }, [isSending]);
  const Logout = () => {
    dispatch({
      type: 'Logout',
      payload: null,
    });
    navigation.navigate('SignIn');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
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
          <Text style={styles.header_text}>HỒ SƠ</Text>
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesomeIcon name="bell" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {/* avatar */}
      <View style={styles.avatar}>
        <View style={styles.avatar_img}>
          <FontAwesomeIcon name="user-circle-o" color="gray" size={90} />
        </View>
      </View>
      <View style={styles.acc_name}>
        <Text style={styles.acc_text}>
          Họ tên: {user !== null ? user.name : null}
        </Text>
        <Text style={styles.acc_text}>
          SDT: {user !== null ? user.phoneNumber : null}
        </Text>
        {/* <Text style={styles.acc_verify}>Đã xác thực</Text> */}
      </View>
      {/* shipper info */}
      <View style={styles.box_info}>
        <View style={styles.box_info_name}>
          <Text style={styles.acc_text}>Thông tin cá nhân</Text>
          <TouchableOpacity>
            <Text style={{color: '#1e90ff', paddingRight: 8}}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.info_text}>
            Ngày sinh:{' '}
            {user !== null ? Moment(user.dateOfBirth).format('l') : null}
          </Text>
          <Text style={styles.info_text}>
            Giới tính: {user !== null ? user.gender : null}
          </Text>
          <Text style={styles.info_text}>
            Email: {user !== null ? user.mail : null}
          </Text>
        </View>
      </View>

      {/* shipper info */}

      <View style={styles.box_p_btn}>
        <TouchableOpacity>
          <Text style={styles.p_btn}>Liên hệ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.p_btn}>Cài đặt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSending(true)}>
          <Text style={styles.p_btn}>Đăng xuất</Text>
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
