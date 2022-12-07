import React, { useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import theme from '../constants/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import 'react-native-gesture-handler';
import {TextInput} from 'react-native-gesture-handler';
import ip from '../api';

const {COLORS, FONTS, SIZES} = theme;

const ChangeTime = ({navigation,route}) => {
  const [orderValue, setOrderValue] = useState(null);
  const [isCancel, setIsCancel] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [active, setActive] = useState(false);
  const [choose, setChoose] = useState(false);
  const [time, setTime] = useState(null);
  //check box

  const [checkTim1, setCheckTime1] = useState(false);
  const [checkTim2, setCheckTime2] = useState(false);
  const [checkTim3, setCheckTime3] = useState(false);
  const [reason1, setReason1] = useState(false);
  const [reason2, setReason2] = useState(false);
  const [reason3, setReason3] = useState(false);
  const [reason4, setReason4] = useState(false);
  
  


  useEffect(() => {
    (async() => {
      const value = await route.params.orderId;
      setOrderValue(value);
    })();
  },[]);

  //Call API Cancel
  const CancelOrder = async id => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders/cancel-order/${encodeURIComponent(id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isCancel) {
      CancelOrder(orderValue.orderId);
      setIsCancel(false);
    }
  }, [isCancel]);

  const ChangeTimeDelivery = async (orderId,timeId) => {
    try {
      const response = await fetch(
        `http://${ip}/api/v0/orders/change-time-delivery/${encodeURIComponent(orderId)}/${encodeURIComponent(timeId)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isChange) {
      ChangeTimeDelivery(orderValue.orderId,time);
      setIsChange(false);
      
    }
  }, [isChange]);


  

  const renderHeader = () => {
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

  const submit_clicked = () => {
    return navigation.navigate('Orders');
  }

  const renderReason = () =>{
    return (
      <View style={styles.container}>
        {/* shipper info */}
        <View style={styles.box_info}>
          <View style={styles.box_info_name}>
            <Text style={styles.acc_text}>Đổi giờ</Text>
          </View>
          <View>
            <View style={styles.Reason}>
              <TouchableOpacity onPress={() => {setTime(1); setActive(false); setCheckTime1(true); setCheckTime2(false); setCheckTime3(false)}}>
                <View style={checkTim1 && active===false ? (styles.checkBox_checked) : (styles.checkBox_unchecked)}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Ca 1 (7h-12h)</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity onPress={() => {setTime(2); setActive(false); setCheckTime1(false); setCheckTime2(true); setCheckTime3(false)}}>
                <View style={checkTim2 && active===false ? (styles.checkBox_checked) : (styles.checkBox_unchecked)}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Ca 2 (12h-16h)</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity onPress={() => {setTime(3); setActive(false); setCheckTime1(false); setCheckTime2(false); setCheckTime3(true)}}>
                <View style={checkTim3 && active===false ? (styles.checkBox_checked) : (styles.checkBox_unchecked)}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Ca 3 (17h-21h)</Text>
            </View>
          </View>
          <View style={styles.box_info_name}>
            <Text style={styles.acc_text}>Hủy giao</Text>
          </View>
          <View>
            <View style={styles.Reason}>
              <TouchableOpacity onPress={() => {setActive(true); setReason1(true); setReason2(false); setReason3(false); setReason4(false)}}>
                <View style={reason1 && active ? (styles.checkBox_checked) : (styles.checkBox_unchecked)}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Từ chối nhận hàng</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity onPress={() => {setActive(true); setReason1(false); setReason2(true); setReason3(false); setReason4(false)}}>
                <View style={reason2 && active ? (styles.checkBox_checked) : (styles.checkBox_unchecked)}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Khách báo không có đặt hàng</Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity onPress={() => {setActive(true); setReason1(false); setReason2(false); setReason3(true); setReason4(false)}}>
                <View style={reason3 && active ? (styles.checkBox_checked) : (styles.checkBox_unchecked)}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>
                Không liên lạc được nhiều lần
              </Text>
            </View>
            <View style={styles.Reason}>
              <TouchableOpacity onPress={() => {setActive(true); setReason1(false); setReason2(false); setReason3(false); setReason4(true)}}>
                <View style={reason4 && active ? (styles.checkBox_checked) : (styles.checkBox_unchecked)}></View>
              </TouchableOpacity>
              <Text style={styles.info_text}>Khác</Text>
            </View>
          </View>
        </View>

        {/* button submit */}
        <View style={styles.button_cancel_change}>
          <TouchableOpacity
            style={orderValue && active ? ([styles.button_change_time,{backgroundColor: '#1e90ff'}]):(styles.button_change_time)}
            onPress={() =>
              Alert.alert('Thông báo', 'Xác nhận hủy giao đơn hàng này !', [
                {
                  text: 'Xác nhận',
                  onPress: () => {
                    setIsCancel(true);
                    // setOrderShipping(null);
                    navigation.navigate('Orders',{
                      page: 'Need_Delivery'
                    });
                  },
                },
                { text: 'Quay lại', onPress: () => console.log('cancel') },
              ])
            }
            disabled={orderValue && active ? false : true}>
            <Text style={{ color: 'black', fontSize: 14 }}>Hủy giao</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={orderValue && active===false ? ([styles.button_change_time,{backgroundColor: '#1e90ff'}]):(styles.button_change_time)}
            onPress={() => 
              Alert.alert('Thông báo', 'Xác nhận đổi thời gian giao đơn hàng này !', [
                {
                  text: 'Xác nhận',
                  onPress: () => {
                    setIsChange(true);
                    // setOrderShipping(null);
                    navigation.navigate('Orders', {
                      page: 'Need_Delivery'
                    });
                  },
                },
                { text: 'Quay lại', onPress: () => console.log('cancel') },
              ])
            } disabled={orderValue && active===false ? false : true}>
            <Text style={{ color: 'black', fontSize: 14 }}>Đổi giờ giao</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button_submit}
          onPress={() => {
            {
              submit_clicked();
            }
          }}>
          <View>
            <Text style={styles.button_title}>Quay lại</Text>
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
export default ChangeTime;

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
  button_cancel_change: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingLeft: 0,
  },
  button_change_time: {
    margin: 8,
    marginTop: 32,
    width: '40%',
    height: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});